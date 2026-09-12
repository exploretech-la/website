import { useId, useState } from "react";
import type { FaqContent } from "../../content/events/types";
import Collapse from "../../components/Collapse";

export default function Faq({ content }: { content: FaqContent }) {
  const [openKey, setOpenKey] = useState<number | null>(null);
  const id = useId();

  return (
    <section className="event-section FAQ" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>Archived event FAQs</h2>
      <p>
        These answers describe this past event. They do not apply to future
        programs.
      </p>
      <div className="faq-list">
        {content.items.map((item) => {
          const questionId = `${id}-question-${item.key}`;
          const panelId = `${id}-panel-${item.key}`;
          const open = openKey === item.key;
          return (
            <div className="faq-item" key={item.key}>
              <h3>
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenKey((current) =>
                      current === item.key ? null : item.key,
                    )
                  }
                >
                  {item.question}
                  <span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
              </h3>
              <Collapse in={open}>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={questionId}
                  className="faq-answer"
                >
                  <p>{item.answer}</p>
                  {item.note && <p>Note: {item.note}</p>}
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    </section>
  );
}
