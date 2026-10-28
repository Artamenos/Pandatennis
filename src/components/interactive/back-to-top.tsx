"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY >= window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <button type="button" className="back-to-top" aria-label="Вернуться наверх" title="Наверх" hidden={!visible} onClick={event => {
    event.currentTarget.blur();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }}>
    <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <defs><clipPath id="back-top-ball"><circle cx="28" cy="28" r="27" /></clipPath></defs>
      <circle cx="28" cy="28" r="27" fill="#d6e744" />
      <g clipPath="url(#back-top-ball)" fill="none" stroke="#fffef0" strokeWidth="2.8">
        <path d="M-5 5C26 9 11 41 42 59M12-5C43 14 28 46 61 51" />
      </g>
      <circle cx="28" cy="28" r="12" fill="#d6e744" />
      <path d="M21 29L28 22L35 29M28 22V36" fill="none" stroke="#20313a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>;
}

