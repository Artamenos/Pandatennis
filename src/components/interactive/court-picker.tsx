"use client";

import { useRef, useState } from "react";
import { MapPin, TrainFront, X } from "lucide-react";
import { Media } from "@/components/ui/media";
import type { Court } from "@/types/content";

function CourtMap({ courts, activeId, onSelect }: {
  courts: Court[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const selected = courts.find(court => court.id === activeId) ?? courts[0];

  return (
    <div className="court-map" aria-label="Схема расположения шести кортов">
      <p className="map-note">Схема / временные точки</p>
      <svg viewBox="0 0 752 576" aria-hidden="true" preserveAspectRatio="none">
        <g className="map-roads" fill="none" strokeWidth="14">
          <path d="M 0 184 L 240 120 L 432 208 L 752 96" />
          <path d="M 0 384 L 216 328 L 440 368 L 752 296" />
          <path d="M 176 64 L 280 264 L 240 576" />
          <path d="M 568 64 L 496 256 L 624 576" />
        </g>
        <path className="map-river" d="M 0 512 C 192 504 296 392 376 280 C 456 168 576 176 752 232" fill="none" strokeWidth="32" />
      </svg>
      {courts.map(court => (
        <button
          key={court.id}
          type="button"
          className={`map-pin ${court.id === activeId ? "is-selected" : ""}`}
          style={{ left: `${court.point[0] / 752 * 100}%`, top: `${court.point[1] / 576 * 100}%` }}
          aria-label={`Выбрать корт ${court.number}, ${court.sport}`}
          aria-pressed={court.id === activeId}
          onClick={() => onSelect(court.id)}
        >{court.number}</button>
      ))}
      <span className="map-selected">Выбран корт {selected.number}</span>
    </div>
  );
}

export function CourtPicker({ courts }: { courts: Court[] }) {
  const [activeId, setActiveId] = useState(courts[0].id);
  const mapDialog = useRef<HTMLDialogElement>(null);
  const selected = courts.find(court => court.id === activeId) ?? courts[0];

  return (
    <>
      <div className="court-options" role="group" aria-label="Выбор корта">
        {courts.map(court => (
          <button
            type="button"
            key={court.id}
            className={`court-option ${court.id === activeId ? "is-selected" : ""}`}
            aria-pressed={court.id === activeId}
            aria-controls="court-detail"
            onClick={() => setActiveId(court.id)}
          >
            <span>{court.number} · {court.sport}</span>
            <span className="court-option-suffix"> / Корт {court.number}</span>
          </button>
        ))}
      </div>
      <div className="court-layout">
        <CourtMap courts={courts} activeId={activeId} onSelect={setActiveId} />
        <article className="court-detail" id="court-detail" aria-live="polite" aria-atomic="true" data-selected-court={selected.id}>
          <div className="court-photo">
            <Media file={selected.image} alt={`Игровая площадка: ${selected.sport.toLowerCase()}`} position={selected.position} />
            <span className="sport-label">{selected.sport}</span>
          </div>
          <h3>{selected.name}</h3>
          <p className="court-description">{selected.description}</p>
          <div className="court-meta" data-placeholder={selected.placeholder}>
            <p><MapPin aria-hidden="true" /><span>{selected.address}</span></p>
            <p><TrainFront aria-hidden="true" /><span>{selected.metro}</span></p>
          </div>
          <button className="button" type="button" aria-haspopup="dialog" onClick={() => mapDialog.current?.showModal()}>Посмотреть на карте</button>
        </article>
      </div>
      <dialog
        ref={mapDialog}
        className="court-map-dialog"
        aria-labelledby="court-map-dialog-title"
        onClick={event => { if (event.target === mapDialog.current) mapDialog.current.close(); }}
      >
        <div className="court-map-dialog-content">
          <div className="court-map-dialog-heading">
            <div><h2 id="court-map-dialog-title">{selected.name}</h2><p>{selected.sport}</p></div>
            <button className="icon-button" type="button" aria-label="Закрыть карту" onClick={() => mapDialog.current?.close()}><X aria-hidden="true" /></button>
          </div>
          <CourtMap courts={courts} activeId={activeId} onSelect={setActiveId} />
        </div>
      </dialog>
    </>
  );
}
