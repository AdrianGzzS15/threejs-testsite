"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { heroState, setHeroInvalidate } from "@/lib/motion/heroState";

const RING_COUNT = 6;
const RX = 2.2;
const RY = 0.9;

function ellipsePoints(rx: number, ry: number, segments = 160) {
  return new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2).getPoints(segments);
}

function buildParts() {
  const ringGeometry = new THREE.BufferGeometry().setFromPoints(ellipsePoints(RX, RY));
  const tubeGeometry = new THREE.TorusGeometry(1, 0.018, 12, 160);
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: "#DEDEDE",
    roughness: 0.45,
    metalness: 0.1,
    transparent: true,
    opacity: 0,
  });

  const rings = Array.from({ length: RING_COUNT }, (_, i) => {
    const material = new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: 0 });
    const baseOpacity = 0.3 + (0.25 * i) / (RING_COUNT - 1);
    const rotation = new THREE.Euler(0.35 + i * 0.12, 0, (i * Math.PI) / 6);
    const line = new THREE.LineLoop(ringGeometry, material);
    line.rotation.copy(rotation);
    const tube = new THREE.Mesh(tubeGeometry, solidMaterial);
    tube.rotation.copy(rotation);
    tube.scale.set(RX, RY, RX);
    return { line, tube, material, baseOpacity };
  });

  const dashedMaterial = new THREE.LineDashedMaterial({
    color: "#FFFFFF",
    transparent: true,
    opacity: 0.22,
    dashSize: 0.08,
    gapSize: 0.14,
  });
  const outer = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(ellipsePoints(2.85, 2.85, 240)),
    dashedMaterial,
  );
  outer.computeLineDistances();

  const groundMaterial = new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: 0.16 });
  const ground = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(ellipsePoints(2.4, 2.4)),
    groundMaterial,
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.3;

  return { rings, outer, ground, dashedMaterial, groundMaterial, solidMaterial, ringGeometry, tubeGeometry };
}

type Parts = ReturnType<typeof buildParts>;

/** Per-frame: copy the GSAP-driven values onto the scene graph. */
function applyHeroState(parts: Parts, g: THREE.Group | null, camera: THREE.Camera) {
  if (!g) return;
  const { rotationY, cameraZ, mix, scale, opacity } = heroState;

  g.rotation.y = rotationY;
  g.scale.setScalar(scale);
  camera.position.z = cameraZ;

  for (const ring of parts.rings) {
    ring.material.opacity = ring.baseOpacity * (1 - 0.7 * mix) * opacity;
  }
  parts.solidMaterial.opacity = mix * 0.9 * opacity;
  parts.solidMaterial.visible = parts.solidMaterial.opacity > 0.001;
  parts.dashedMaterial.opacity = 0.22 * opacity;
  parts.groundMaterial.opacity = 0.16 * opacity;
}

/**
 * Abstract "kinetic form": six intersecting ellipse rings rotated 0–150° around Z,
 * a dashed outer ring and a ground ellipse. `heroState.mix` blends the line
 * rings into solid tubes (stand-in for the future GLB's uMix shader).
 */
function KineticForm() {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  const parts = useMemo(() => buildParts(), []);

  useEffect(() => {
    setHeroInvalidate(invalidate);
    return () => {
      setHeroInvalidate(null);
      parts.ringGeometry.dispose();
      parts.tubeGeometry.dispose();
      parts.solidMaterial.dispose();
      parts.dashedMaterial.dispose();
      parts.groundMaterial.dispose();
      parts.outer.geometry.dispose();
      parts.ground.geometry.dispose();
      parts.rings.forEach((r) => r.material.dispose());
    };
  }, [invalidate, parts]);

  useFrame((state) => applyHeroState(parts, group.current, state.camera));

  return (
    <>
      <group ref={group} rotation={[0.15, 0, 0]}>
        {parts.rings.map((r, i) => (
          <group key={i}>
            <primitive object={r.line} />
            <primitive object={r.tube} />
          </group>
        ))}
        <primitive object={parts.outer} />
      </group>
      <primitive object={parts.ground} />
    </>
  );
}

interface HeroSceneProps {
  /** False while off-screen: the render loop is paused entirely. */
  active: boolean;
  onReady: () => void;
}

export default function HeroScene({ active, onReady }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "demand" : "never"}
      camera={{ position: [0, 0, heroState.cameraZ], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={() => requestAnimationFrame(onReady)}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <KineticForm />
    </Canvas>
  );
}
