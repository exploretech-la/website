import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";

/**
 * The one carousel this site uses: the About section's photo strip.
 *
 * It reproduces Bootstrap 4's `.carousel.slide` markup and its class
 * choreography (`carousel-item-next` -> reflow -> `carousel-item-left`), so the
 * existing stylesheet drives the same 600ms slide. Slide contents are supplied
 * by the caller, which also owns which slide is selected; this component owns
 * only the transition, autoplay, keyboard, hover and touch behaviour.
 */

const SWIPE_THRESHOLD = 40;

/** dom-helpers padded its emulated transition end by 5ms; keep that slack. */
const TRANSITION_END_PADDING_MS = 5;

export interface CarouselSlideItem {
  readonly key: string;
  readonly content: ReactNode;
}

interface CarouselProps {
  readonly className: string;
  readonly items: readonly CarouselSlideItem[];
  readonly activeIndex: number;
  /** Autoplay delay in milliseconds, or null to leave autoplay off. */
  readonly interval: number | null;
  readonly onSelect: (index: number) => void;
}

type SlideDirection = "next" | "prev";

interface SlideState {
  readonly from: number;
  readonly to: number;
  readonly direction: SlideDirection;
  /** `start` positions the incoming slide; `active` runs the transition. */
  readonly phase: "start" | "active";
}

function useEventCallback<A extends unknown[]>(
  fn: (...args: A) => void,
): (...args: A) => void {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}

function transitionDuration(node: Element): number {
  const value = window.getComputedStyle(node).transitionDuration || "";
  const multiplier = value.indexOf("ms") === -1 ? 1000 : 1;
  return parseFloat(value) * multiplier || 0;
}

function isVisible(element: HTMLElement | null): boolean {
  const parent = element?.parentElement;
  if (!element || !parent) return false;
  return (
    window.getComputedStyle(element).display !== "none" &&
    window.getComputedStyle(element).visibility !== "hidden" &&
    window.getComputedStyle(parent).display !== "none"
  );
}

export default function Carousel({
  className,
  items,
  activeIndex,
  interval,
  onSelect,
}: CarouselProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const enteringRef = useRef<HTMLDivElement | null>(null);
  const pendingDirectionRef = useRef<SlideDirection | null>(null);

  const [renderedActiveIndex, setRenderedActiveIndex] = useState(activeIndex);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [pausedOnHover, setPausedOnHover] = useState(false);
  const [pausedOnTouch, setPausedOnTouch] = useState(false);

  // Adopt a new selection during render so the outgoing and incoming slides
  // commit together, exactly as the Bootstrap carousel did.
  if (slide === null && activeIndex !== renderedActiveIndex) {
    setSlide({
      from: renderedActiveIndex,
      to: activeIndex,
      direction:
        pendingDirectionRef.current ??
        (activeIndex > renderedActiveIndex ? "next" : "prev"),
      phase: "start",
    });
    setRenderedActiveIndex(activeIndex);
  }

  const isSliding = slide !== null;
  const count = items.length;

  const prev = useCallback(() => {
    if (isSliding) return;
    const target = renderedActiveIndex - 1;
    pendingDirectionRef.current = "prev";
    onSelect(target < 0 ? count - 1 : target);
  }, [isSliding, renderedActiveIndex, onSelect, count]);

  // Stable so the autoplay interval is not torn down on every render.
  const next = useEventCallback(() => {
    if (isSliding) return;
    const target = renderedActiveIndex + 1;
    pendingDirectionRef.current = "next";
    onSelect(target >= count ? 0 : target);
  });

  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(elementRef.current)) next();
  });

  useLayoutEffect(() => {
    if (slide === null || slide.phase !== "start") return;
    pendingDirectionRef.current = null;
    // Force layout between the positioning class and the moving class so the
    // browser animates instead of jumping.
    if (enteringRef.current) void enteringRef.current.offsetHeight;
    setSlide({ ...slide, phase: "active" });
  }, [slide]);

  useEffect(() => {
    if (slide === null || slide.phase !== "active") return undefined;
    const node = enteringRef.current;
    if (!node) {
      setSlide(null);
      return undefined;
    }
    const finish = () => setSlide(null);
    const handle = window.setTimeout(
      finish,
      transitionDuration(node) + TRANSITION_END_PADDING_MS,
    );
    node.addEventListener("transitionend", finish);
    return () => {
      window.clearTimeout(handle);
      node.removeEventListener("transitionend", finish);
    };
  }, [slide]);

  const shouldPlay =
    interval !== null && !pausedOnHover && !pausedOnTouch && !isSliding;

  useEffect(() => {
    if (!shouldPlay) return undefined;
    const handle = window.setInterval(
      document.visibilityState ? nextWhenVisible : next,
      interval ?? undefined,
    );
    return () => window.clearInterval(handle);
  }, [shouldPlay, next, interval, nextWhenVisible]);

  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const touchUnpauseRef = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(touchUnpauseRef.current), []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLElement &&
      /input|textarea/i.test(event.target.tagName)
    )
      return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setPausedOnTouch(true);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchDeltaXRef.current =
      event.touches.length > 1
        ? 0
        : event.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    const touchDeltaX = touchDeltaXRef.current;
    // A tap below the swipe threshold leaves autoplay paused, as before.
    if (Math.abs(touchDeltaX) <= SWIPE_THRESHOLD) return;
    if (touchDeltaX > 0) prev();
    else next();
    window.clearTimeout(touchUnpauseRef.current);
    touchUnpauseRef.current = window.setTimeout(
      () => setPausedOnTouch(false),
      interval ?? undefined,
    );
  };

  const slideClassName = (index: number): string => {
    if (slide === null) {
      return index === renderedActiveIndex
        ? "active carousel-item"
        : "carousel-item";
    }
    const order = `carousel-item-${slide.direction}`;
    const moving = `carousel-item-${slide.direction === "next" ? "left" : "right"}`;
    if (index === slide.to) {
      return slide.phase === "start"
        ? `${order} carousel-item`
        : `${order} ${moving} carousel-item`;
    }
    if (index === slide.from) {
      return slide.phase === "start"
        ? "active carousel-item"
        : `active ${moving} carousel-item`;
    }
    return "carousel-item";
  };

  return (
    <div
      ref={elementRef}
      className={`${className} carousel slide`}
      onKeyDown={handleKeyDown}
      onMouseOver={() => setPausedOnHover(true)}
      onMouseOut={() => setPausedOnHover(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ol className="carousel-indicators">
        {items.map((item, index) => (
          <li
            key={item.key}
            className={index === renderedActiveIndex ? "active" : undefined}
            onClick={() => onSelect(index)}
          />
        ))}
      </ol>
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={item.key}
            ref={slide !== null && index === slide.to ? enteringRef : undefined}
            className={slideClassName(index)}
          >
            {item.content}
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        role="button"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          prev();
        }}
        onKeyDown={(event) => {
          if (event.key !== " ") return;
          event.preventDefault();
          prev();
        }}
      >
        <span aria-hidden="true" className="carousel-control-prev-icon" />
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        role="button"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          next();
        }}
        onKeyDown={(event) => {
          if (event.key !== " ") return;
          event.preventDefault();
          next();
        }}
      >
        <span aria-hidden="true" className="carousel-control-next-icon" />
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
}
