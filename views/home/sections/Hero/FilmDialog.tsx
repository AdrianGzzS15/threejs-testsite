"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** "Watch the film" trigger + modal <dialog> stub (focus trap, Esc and focus return are native). */
export function FilmDialog({ label }: { label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={triggerRef}
        intent="secondary"
        tone="dark"
        size="lg"
        leadingIcon="play"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="w-full sm:w-auto"
      >
        {label}
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby="film-title"
        data-theme="dark"
        onClose={() => triggerRef.current?.focus()}
        className="m-auto w-[min(960px,calc(100vw-32px))] max-w-none rounded-lg bg-ink-900 p-0 text-white shadow-overlay"
      >
        <div className="flex items-center justify-between border-b border-ink-800 py-2 pl-6 pr-2">
          <h2 id="film-title" className="font-display text-lg font-bold">
            KINETIC — Season 04 film
          </h2>
          <button
            type="button"
            aria-label="Close film"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink-850"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="flex aspect-video items-center justify-center bg-ink-950">
          <p className="data uppercase tracking-[0.12em] text-ink-400">Video · 1:12 · coming soon</p>
        </div>
      </dialog>
    </>
  );
}
