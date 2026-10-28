"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Media } from "@/components/ui/media";
import type { TrainingStep } from "@/types/content";

export function TrainingJourney({ steps }: { steps: TrainingStep[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const accordion = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const completed = useRef(false);
  const activeIndex = useRef(0);

  useEffect(() => {
    const section = accordion.current?.closest<HTMLElement>(".journey");
    const sticky = section?.querySelector<HTMLElement>(".journey-sticky");
    if (!section || !sticky) return;
    if (completed.current) {
      section.dataset.completed = "true";
      if (progress.current) progress.current.style.width = "0%";
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      if (completed.current) return;
      const travel = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
      const bounds = section.getBoundingClientRect();
      const value = travel > 0 ? Math.max(0, Math.min(1, -bounds.top / travel)) : 0;
      const next = Math.round(value * (steps.length - 1));
      activeIndex.current = next;
      setActive(current => current === next ? current : next);
      if (progress.current) progress.current.style.width = `${value * 100}%`;
      section.dataset.scrollProgress = value.toFixed(4);
      if (travel > 0 && -bounds.top >= travel - 1) {
        // Remove the consumed scroll space while preserving the visible scene position.
        const sectionTop = window.scrollY + bounds.top;
        const scrollTop = Math.ceil(Math.max(sectionTop, window.scrollY - travel));
        completed.current = true;
        section.dataset.completed = "true";
        window.scrollTo({ top: scrollTop, behavior: "instant" });
      }
    };
    const request = () => { if (!completed.current && !frame) frame = requestAnimationFrame(update); };
    let lockUntil = 0;
    let lastWheel = 0;
    let swallowUntil = 0;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 1 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (document.querySelector("dialog[open]")) return;
      const target = event.target;
      if (target instanceof Element && target.closest("input,textarea,select,[contenteditable=true]")) return;
      const now = performance.now();
      const gap = now - lastWheel;
      if (completed.current) {
        // Consume only the remaining inertia of the gesture that opened the last panel.
        if (now < swallowUntil && gap < 160) { event.preventDefault(); lastWheel = now; }
        return;
      }
      const bounds = section.getBoundingClientRect();
      if (bounds.top > 2 || bounds.bottom < sticky.offsetHeight - 2) { lastWheel = 0; return; }
      const direction = event.deltaY > 0 ? 1 : -1;
      if (direction < 0 && activeIndex.current === 0) { lastWheel = 0; return; }
      event.preventDefault();
      lastWheel = now;
      if (now < lockUntil || gap < 120) return;
      lockUntil = now + 550;
      swallowUntil = now + 900;
      const next = Math.max(0, Math.min(steps.length - 1, activeIndex.current + direction));
      const travel = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
      const top = Math.ceil(window.scrollY + bounds.top + travel * next / Math.max(1, steps.length - 1));
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    };
    update();
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    const observer = new ResizeObserver(request);
    observer.observe(section);
    observer.observe(sticky);
    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  useEffect(() => {
    const root = accordion.current;
    const gallery = root?.querySelector<HTMLElement>(".journey-gallery");
    if (!root || !gallery) return;
    const measure = () => {
      const style = getComputedStyle(gallery);
      const vertical = style.flexDirection === "column";
      const gap = parseFloat(style.columnGap) || 0;
      const grow = window.innerWidth <= 980 ? 4 : 3.3;
      const widePanel = vertical ? gallery.clientWidth : (gallery.clientWidth - gap * (steps.length - 1)) * grow / (grow + steps.length - 1);
      const inset = vertical ? (window.innerHeight <= 650 ? 36 : 40) : (window.innerWidth <= 980 ? 30 : 44);
      root.style.setProperty("--journey-expanded-copy-width", `${Math.max(1, widePanel - inset)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(gallery);
    window.addEventListener("resize", measure, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [steps.length]);

  useEffect(() => {
    let alive = true;
    const alignInitialAnchor = () => {
      const section = accordion.current?.closest<HTMLElement>(".journey");
      if (!alive || !section || window.location.hash !== "#approach" || completed.current || activeIndex.current !== 0) return;
      const bounds = section.getBoundingClientRect();
      if (Math.abs(bounds.top) < window.innerHeight / 2) {
        window.scrollTo({ top: Math.ceil(window.scrollY + bounds.top), behavior: "instant" });
      }
    };
    void document.fonts.ready.then(() => {
      if (alive) requestAnimationFrame(alignInitialAnchor);
    });
    const anchorObserver = new ResizeObserver(() => requestAnimationFrame(alignInitialAnchor));
    anchorObserver.observe(document.body);
    window.addEventListener("load", alignInitialAnchor, { once: true });
    return () => { alive = false; anchorObserver.disconnect(); window.removeEventListener("load", alignInitialAnchor); };
  }, []);
  function select(index: number, focus = false) {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    const section = accordion.current?.closest<HTMLElement>(".journey");
    const sticky = section?.querySelector<HTMLElement>(".journey-sticky");
    if (!section || !sticky) return;
    if (completed.current) {
      activeIndex.current = next;
      setActive(next);
      if (progress.current) progress.current.style.width = `${next / Math.max(1, steps.length - 1) * 100}%`;
    } else {
      const travel = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
      const top = Math.ceil(window.scrollY + section.getBoundingClientRect().top + travel * next / Math.max(1, steps.length - 1));
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    if (focus) buttons.current[next]?.focus({ preventScroll: true });
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      suppressClick.current = true;
      select(active + (dx < 0 ? 1 : -1));
    }
  }

  return (
    <div className="journey-accordion" ref={accordion}>
      <div className="journey-gallery" aria-label="Этапы обучения"
        onPointerDown={event => { suppressClick.current = false; start.current = { x: event.clientX, y: event.clientY }; }}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { start.current = null; }}
        onPointerLeave={() => { start.current = null; }}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
      >
        {steps.map((step, index) => (
          <article className={`journey-photo-panel ${active === index ? "is-open" : ""}`} key={step.id}>
            <Media file={step.image} alt="" position={step.position} />
            <button type="button" className="journey-panel-trigger"
              ref={element => { buttons.current[index] = element; }}
              aria-label={step.title} aria-expanded={active === index} aria-controls={`journey-details-${step.id}`} aria-describedby={active === index ? `journey-details-${step.id}` : undefined}
              onClick={() => select(index)}
              onKeyDown={event => {
                let next: number | undefined;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = steps.length - 1;
                if (next !== undefined) { event.preventDefault(); select(next, true); }
              }}
            >
              <span className="journey-photo-copy journey-copy-compact" aria-hidden="true">
                <span className="journey-photo-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="journey-photo-title">{step.title}</span>
              </span>
              <span className="journey-photo-copy journey-copy-expanded" aria-hidden={active !== index}>
                <span className="journey-photo-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="journey-photo-title">{step.title}</span>
                <span className="journey-description" id={`journey-details-${step.id}`}>{step.description}</span>
              </span>
            </button>
          </article>
        ))}
      </div>
      <div className="journey-gallery-footer">
        <div className="journey-gallery-dots" aria-label="Выбрать этап">
          {steps.map((step, index) => <button type="button" key={step.id} aria-label={step.title} aria-pressed={active === index} onClick={() => select(index)}>{String(index + 1).padStart(2, "0")}</button>)}
        </div>
        <div className="journey-scroll-progress" aria-hidden="true"><i ref={progress} /></div>
        <span className="journey-gallery-count" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
