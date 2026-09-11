import { useState } from "react";

import type { FaqContent } from "../../content/events/types";
import Collapse from "../../components/Collapse";

/**
 * One accordion, two presentations: the registration page uses plain text inside
 * smaller headings, the resources pages wrap every question and answer in `h5`.
 */
export default function Faq({ content }: { content: FaqContent }) {
  const [openKey, setOpenKey] = useState<number | null>(content.initialOpenKey);
  const registration = content.kind === "registration";

  return (
    <section className="Section FAQ">
      <div className="faq-content">
        <div className="faq-content faq-centered-title">
          <h2 className="title">FAQs</h2>
          <div className="pill-divider" />
          {registration ? (
            <p>
              If your question is not answered below, please reach out to us at
              exploretechla@cs.ucla.edu for more information!
            </p>
          ) : (
            <p>
              If your question is not answered below, please reach out to us at{" "}
              <a
                href="mailto:exploretechla@cs.ucla.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                exploretechla@cs.ucla.edu
              </a>{" "}
              for more information!
            </p>
          )}
          {content.intro && (
            <>
              <h3>{content.intro.heading}</h3>
              <p>{content.intro.body}</p>
            </>
          )}
        </div>
        <div className="faq-student">
          <div className="faq-section-title">
            {registration ? (
              <h4 className="title">Student FAQs</h4>
            ) : (
              <h3 className="title">Student FAQs</h3>
            )}
            <div className="pill-divider" />
          </div>
          <div className="accordion">
            {content.items.map((item) => (
              <div className="content-card" key={item.key}>
                {/*
                  The shipped header is a plain div with a click handler; it was never
                  focusable or keyboard-operable. Preserved rather than quietly changed.
                */}
                <div
                  className="content-card-header"
                  onClick={() =>
                    setOpenKey((current) =>
                      current === item.key ? null : item.key,
                    )
                  }
                >
                  {registration ? (
                    <b>{item.question}</b>
                  ) : (
                    <h5>
                      <b>{item.question}</b>
                    </h5>
                  )}
                </div>
                <Collapse in={openKey === item.key}>
                  <div className="content-card-body">
                    {registration ? item.answer : <h5>{item.answer}</h5>}
                    {item.note && <p>Note: {item.note}</p>}
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
