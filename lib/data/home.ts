export type Level = "Beginner" | "Intermediate" | "Advanced" | "All levels";

export interface ImageSpec {
  alt: string;
  tone: string;
  caption: string;
  src?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroFeature {
  num: string;
  label: string;
}

export interface Principle {
  counter: string;
  title: string;
  body: string;
  image: ImageSpec;
}

export interface ProgramSummary {
  slug: string;
  name: string;
  level: Level;
  description: string;
  meta: string;
  image: ImageSpec;
  isNew?: boolean;
}

export type Pose = "squat" | "swing" | "stride" | "lunge" | "plank" | "seated";

export interface Category {
  num: string;
  name: string;
  examples: string;
  pose: Pose;
  href: string;
}

export interface DayPlan {
  day: string;
  session: string;
  duration: string;
  variant: "hard" | "easy" | "long" | "rest";
}

export interface SeriesPoint {
  week: number;
  value: number;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Programs", href: "/programs" },
  { label: "Exercises", href: "/exercises" },
  { label: "My Progress", href: "/progress" },
];

export const authLinks = {
  signIn: { label: "Sign in", href: "/signin" },
  startFree: { label: "Start free", href: "/signup" },
};

export const hero = {
  eyebrow: "Season 04 — Now training",
  titleLines: ["Move with", "intent."],
  body: "Coach-built strength, conditioning and mobility programs. Every rep cued, every session planned, every week measured.",
  primaryCta: { label: "Find your program", href: "/programs" },
  filmCta: "Watch the film · 1:12",
  features: [
    { num: "01", label: "Coach-built programs" },
    { num: "02", label: "Form cues on every lift" },
    { num: "03", label: "Progress you can see" },
  ] satisfies HeroFeature[],
  poster: {
    alt: "Black-and-white photo of a sprinter, side-lit, mid-stride",
    tone: "#141414",
    caption: "IMG · sprinter, side-lit",
  } satisfies ImageSpec,
};

export const principlesTitle = "Training that respects how bodies adapt.";

export const principles: Principle[] = [
  {
    counter: "01 / 03",
    title: "Strength is a skill.",
    body: "Practice the pattern before you load it. Every movement ships with a video demo, three coaching cues and a regression.",
    image: {
      alt: "Chalked hands gripping a barbell",
      tone: "#1F1F1F",
      caption: "IMG · chalked grip on barbell",
    },
  },
  {
    counter: "02 / 03",
    title: "Consistency compounds.",
    body: "Sessions fit your week, not the other way round. Miss a day and the plan adjusts instead of starting over.",
    image: {
      alt: "Runner on an empty road at dawn",
      tone: "#2A2A2A",
      caption: "IMG · dawn road run",
    },
  },
  {
    counter: "03 / 03",
    title: "Recovery is training.",
    body: "Deload weeks, mobility flows and sleep-aware scheduling are built in, so progress keeps showing up.",
    image: {
      alt: "Athlete doing a mobility drill in window light",
      tone: "#3A3A3A",
      caption: "IMG · mobility, window light",
    },
  },
];

export const featuredProgram: ProgramSummary = {
  slug: "hybrid-engine",
  name: "Hybrid Engine",
  level: "Intermediate",
  isNew: true,
  description:
    "Lift heavy and run far in the same week. Three strength days, two aerobic sessions, one long effort.",
  meta: "12 WK · 5 DAYS/WK · 55 MIN",
  image: {
    alt: "Athlete pushing a weighted sled across turf",
    tone: "#262626",
    caption: "IMG · sled push, turf",
  },
};

export const programs: ProgramSummary[] = [
  {
    slug: "foundation-strength",
    name: "Foundation Strength",
    level: "Beginner",
    description: "Learn the big five lifts with a coach in your ear.",
    meta: "8 WK · 3 DAYS · 45 MIN",
    image: {
      alt: "Lifter setting up for a barbell squat",
      tone: "#D9D9D9",
      caption: "IMG · barbell setup",
    },
  },
  {
    slug: "mobility-reset",
    name: "Mobility Reset",
    level: "All levels",
    description: "Daily flows for hips, spine and shoulders.",
    meta: "4 WK · DAILY · 20 MIN",
    image: {
      alt: "Athlete in a deep hip-opening stretch",
      tone: "#C4C4C4",
      caption: "IMG · hip flow",
    },
  },
  {
    slug: "power-speed",
    name: "Power & Speed",
    level: "Advanced",
    description: "Jumps, sprints and Olympic-lift derivatives.",
    meta: "6 WK · 4 DAYS · 50 MIN",
    image: {
      alt: "Athlete exploding upward in a box jump",
      tone: "#B0B0B0",
      caption: "IMG · box jump",
    },
  },
];

export const categories: Category[] = [
  { num: "01", name: "Strength", examples: "Squat · Hinge · Press · Pull", pose: "squat", href: "/exercises/strength" },
  { num: "02", name: "Conditioning", examples: "Intervals · Carries · Sled · Row", pose: "swing", href: "/exercises/conditioning" },
  { num: "03", name: "Running", examples: "Easy · Tempo · Hills · Drills", pose: "stride", href: "/exercises/running" },
  { num: "04", name: "Mobility", examples: "Hips · T-spine · Ankles · Shoulders", pose: "lunge", href: "/exercises/mobility" },
  { num: "05", name: "Core", examples: "Anti-rotation · Bracing · Flexion", pose: "plank", href: "/exercises/core" },
  { num: "06", name: "Recovery", examples: "Breathwork · Soft tissue · Walks", pose: "seated", href: "/exercises/recovery" },
];

export const week: DayPlan[] = [
  { day: "MON", session: "Lower strength", duration: "55 min", variant: "hard" },
  { day: "TUE", session: "Zone 2 run", duration: "40 min", variant: "easy" },
  { day: "WED", session: "Upper strength", duration: "50 min", variant: "hard" },
  { day: "THU", session: "Mobility", duration: "20 min", variant: "easy" },
  { day: "FRI", session: "Full body power", duration: "45 min", variant: "hard" },
  { day: "SAT", session: "Long effort", duration: "75 min", variant: "long" },
  { day: "SUN", session: "Rest", duration: "Walk optional", variant: "rest" },
];

export const squatSeries: SeriesPoint[] = [130, 132.5, 132.5, 135, 137.5, 137.5, 140, 142.5].map(
  (value, i) => ({ week: i + 1, value }),
);

export const footerColumns: FooterColumn[] = [
  {
    heading: "TRAIN",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Exercises", href: "/exercises" },
      { label: "Explore", href: "/explore" },
    ],
  },
  {
    heading: "ACCOUNT",
    links: [
      { label: "My Progress", href: "/progress" },
      { label: "Membership", href: "/membership" },
      { label: "Help center", href: "/help" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Coaches", href: "/coaches" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];
