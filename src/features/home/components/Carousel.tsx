import type { ReactNode } from "react";

export interface CarouselSlideItem {
  readonly key: string;
  readonly content: ReactNode;
}

interface CarouselProps {
  readonly className: string;
  readonly items: readonly CarouselSlideItem[];
  readonly activeIndex: number;
  readonly status: string;
  readonly onSelect: (index: number) => void;
}

/** The caller keeps the last loaded image visible while a selection loads. */
export default function Carousel({
  className,
  items,
  activeIndex,
  status,
  onSelect,
}: CarouselProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={`${className} photo-gallery`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from past exploretech.la events"
    >
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={item.key}
            className={`carousel-item${index === activeIndex ? " active" : ""}`}
            aria-hidden={index !== activeIndex}
          >
            {item.content}
          </div>
        ))}
      </div>
      <div className="gallery-controls">
        <button
          type="button"
          className="carousel-control-prev"
          aria-label="Previous photo"
          onClick={() =>
            onSelect((activeIndex + items.length - 1) % items.length)
          }
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="carousel-indicators" aria-label="Choose a photo">
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-label={`Show photo ${index + 1}: ${item.key}`}
              aria-pressed={index === activeIndex}
              onClick={() => onSelect(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="carousel-control-next"
          aria-label="Next photo"
          onClick={() => onSelect((activeIndex + 1) % items.length)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p
        className="gallery-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </p>
    </div>
  );
}
