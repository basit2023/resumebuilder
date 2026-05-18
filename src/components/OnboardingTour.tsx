"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export type TourStep = {
  /** CSS selector for the element to spotlight. Omit for a centered explainer card. */
  selector?: string;
  title: string;
  body: string;
  /** Preferred tooltip placement relative to target. Default: auto. */
  placement?: "top" | "bottom" | "left" | "right";
};

type Props = {
  /** localStorage key — the tour shows once per browser unless reset. */
  tourKey: string;
  steps: TourStep[];
  /** Delay before first showing (lets the page settle). ms */
  startDelay?: number;
};

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 8;

export function OnboardingTour({ tourKey, steps, startDelay = 600 }: Props) {
  const storageKey = `tour:${tourKey}`;
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  // Decide whether to run (once per browser).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(storageKey) === "done") return;
    const t = setTimeout(() => setActive(true), startDelay);
    return () => clearTimeout(t);
  }, [storageKey, startDelay]);

  const measure = useCallback(() => {
    const step = steps[idx];
    if (!step?.selector) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [idx, steps]);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    const reMeasure = setTimeout(measure, 350); // after scrollIntoView settles
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
      clearTimeout(reMeasure);
    };
  }, [active, idx, measure]);

  const finish = useCallback(() => {
    localStorage.setItem(storageKey, "done");
    setActive(false);
  }, [storageKey]);

  const next = useCallback(() => {
    if (idx >= steps.length - 1) finish();
    else setIdx((i) => i + 1);
  }, [idx, steps.length, finish]);

  const back = useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") finish();
      else if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") back();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, finish, next, back]);

  if (!active || steps.length === 0) return null;

  const step = steps[idx];
  const isLast = idx === steps.length - 1;

  // Spotlight box (with padding) or centered if no target.
  const hole = rect
    ? {
        top: Math.max(0, rect.top - PAD),
        left: Math.max(0, rect.left - PAD),
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null;

  // Tooltip position
  const tip = computeTipPosition(hole, step.placement);

  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite" role="dialog">
      {/* Dim overlay — 4 panels around the hole so the target stays clickable-looking */}
      {hole ? (
        <>
          <div className="absolute bg-black/60 transition-all" style={{ top: 0, left: 0, right: 0, height: hole.top }} />
          <div className="absolute bg-black/60 transition-all" style={{ top: hole.top + hole.height, left: 0, right: 0, bottom: 0 }} />
          <div className="absolute bg-black/60 transition-all" style={{ top: hole.top, left: 0, width: hole.left, height: hole.height }} />
          <div className="absolute bg-black/60 transition-all" style={{ top: hole.top, left: hole.left + hole.width, right: 0, height: hole.height }} />
          {/* Highlight ring */}
          <div
            className="absolute rounded-xl ring-2 ring-white ring-offset-2 ring-offset-brand-500 transition-all"
            style={{ top: hole.top, left: hole.left, width: hole.width, height: hole.height }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/60" />
      )}

      {/* Tooltip card */}
      <div
        className="absolute w-[320px] max-w-[88vw] rounded-2xl bg-white p-5 shadow-2xl transition-all"
        style={tip}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
            Step {idx + 1} of {steps.length}
          </span>
          <button
            onClick={finish}
            className="text-xs font-medium text-gray-400 hover:text-gray-600"
          >
            Skip tour
          </button>
        </div>

        <h3 className="mt-2 text-lg font-bold text-gray-900">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{step.body}</p>

        {/* Progress dots */}
        <div className="mt-4 flex items-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-5 bg-brand-600" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          <button
            onClick={back}
            disabled={idx === 0}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={next}
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            {isLast ? "Got it 🎉" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function computeTipPosition(
  hole: Rect | null,
  placement?: TourStep["placement"]
): React.CSSProperties {
  const W = 320;
  const H = 220;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  if (!hole) {
    return {
      top: vh / 2 - H / 2,
      left: vw / 2 - W / 2,
    };
  }

  const below = hole.top + hole.height + 14;
  const above = hole.top - H - 14;
  const place = placement ?? (below + H < vh ? "bottom" : above > 0 ? "top" : "bottom");

  let top: number;
  if (place === "top") top = Math.max(12, above);
  else top = Math.min(vh - H - 12, below);

  let left = hole.left + hole.width / 2 - W / 2;
  left = Math.max(12, Math.min(vw - W - 12, left));

  return { top, left };
}
