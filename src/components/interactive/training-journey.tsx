"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/ui/media";
import type { TrainingStep } from "@/types/content";

export function TrainingJourney({ steps }: { steps: TrainingStep[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current) return;
      const bounds = root.current.getBoundingClientRect();
      // The sequence unfolds while the composition passes through the viewport.
      // No pinned screens, intercepted wheel events, or additional scroll distance.
      const progress = (window.innerHeight * 0.72 - bounds.top) / (window.innerHeight * 0.62);
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        setActive(Math.max(0, Math.min(steps.length - 1, Math.floor(progress * steps.length))));
      }
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) buttons.current[index]?.focus();
  }

  return (
    <div className="journey-layout" ref={root}>
      <div className="journey-controls">
        <div className="journey-track" aria-hidden="true">
          <span>ВАША ИГРА В ТРЁХ ШАГАХ</span>
          <span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
          <div className="journey-progress"><i style={{ width: `${(active + 1) / steps.length * 100}%` }} /></div>
        </div>
        <div className="journey-tabs" role="tablist" aria-label="Этапы тренировки" aria-orientation="vertical">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.id}
              ref={element => { buttons.current[index] = element; }}
              id={`step-tab-${step.id}`}
              role="tab"
              aria-selected={active === index}
              aria-controls={`step-panel-${step.id}`}
              tabIndex={active === index ? 0 : -1}
              className={`journey-tab ${active === index ? "is-active" : ""}`}
              onClick={() => select(index)}
              onKeyDown={event => {
                let next: number | undefined;
                if (event.key === "ArrowDown") next = (index + 1) % steps.length;
                if (event.key === "ArrowUp") next = (index - 1 + steps.length) % steps.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = steps.length - 1;
                if (next !== undefined) { event.preventDefault(); select(next, true); }
              }}
            >
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{step.title}</span>
              <span className="step-state" aria-hidden="true">{active === index ? "В игре" : ""}</span>
            </button>
          ))}
        </div>
        <p className="journey-hint">Листайте страницу или выберите этап.</p>
      </div>
      <div className="journey-scene">
        {steps.map((step, index) => (
          <div
            key={step.id}
            id={`step-panel-${step.id}`}
            role="tabpanel"
            aria-labelledby={`step-tab-${step.id}`}
            aria-hidden={active !== index}
            tabIndex={active === index ? 0 : -1}
            className={`journey-panel ${active === index ? "is-active" : ""}`}
          >
            <Media file={step.image} alt={step.caption} position={step.position} />
            <div className="journey-panel-copy">
              <span className="journey-panel-number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{step.caption}</h3><p>{step.description.replaceAll("\n", " ")}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
