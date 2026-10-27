"use client";

import { useRef, useState } from "react";

type Question = { question: string; answer: string };
const labels = ["Без опыта", "Что взять", "Теннис или падел"];

export function QuickFaq({ questions }: { questions: Question[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) refs.current[index]?.focus();
  }

  return (
    <div className="quick-faq" id="questions">
      <h3>Перед первой тренировкой</h3>
      <div className="quick-faq-tabs" role="tablist" aria-label="Вопросы о тренировках">
        {questions.map((item, index) => (
          <button
            key={item.question}
            type="button"
            id={`faq-tab-${index}`}
            ref={element => { refs.current[index] = element; }}
            role="tab"
            aria-selected={active === index}
            aria-controls={`faq-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={event => {
              let next: number | undefined;
              if (event.key === "ArrowRight") next = (index + 1) % questions.length;
              if (event.key === "ArrowLeft") next = (index - 1 + questions.length) % questions.length;
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = questions.length - 1;
              if (next !== undefined) { event.preventDefault(); select(next, true); }
            }}
          >{labels[index] ?? item.question}</button>
        ))}
      </div>
      {questions.map((item, index) => (
        <div
          key={item.question}
          id={`faq-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${index}`}
          tabIndex={0}
          hidden={active !== index}
          className="quick-faq-panel"
        >
          <h4>{item.question}</h4>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
