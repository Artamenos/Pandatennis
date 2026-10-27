"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#coach", label: "О тренере" },
  { href: "#courts", label: "Мои корты" },
  { href: "#formats", label: "Занятия" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="PandaTennis — в начало" onClick={() => setOpen(false)}>
          <svg className="tennis-brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="header-tennis-ball-clip"><circle cx="20" cy="20" r="19" /></clipPath>
            </defs>
            <circle cx="20" cy="20" r="19" fill="#cbe333" />
            <g clipPath="url(#header-tennis-ball-clip)" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M-3 3C19 6 8 29 30 42M9-3C31 10 20 33 43 36" />
            </g>
          </svg>
          <span>PandaTennis</span>
        </a>
        <button className="icon-button menu-toggle" type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-navigation" aria-label="Основная навигация">
          {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a className="header-mobile-contact" href="#contacts" onClick={() => setOpen(false)}>Связаться с тренером</a>
        </nav>
        <a className="header-contact" href="#contacts">Связаться с тренером</a>
      </div>
    </header>
  );
}
