import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Status = "entered" | "entering" | "exiting" | "exited";

const STATUS_CLASS: Record<Status, string> = {
  entered: "disclosure show",
  entering: "disclosure-transition",
  exiting: "disclosure-transition",
  exited: "disclosure",
};

// Normal motion settles on transitionend, with a bounded safety timeout.
// Without a transition, visibility and focus completion must settle immediately.
const FALLBACK_MS = 300;

function outerHeight(node: HTMLElement): number {
  const style = window.getComputedStyle(node);
  return (
    node.offsetHeight +
    (parseInt(style.marginTop, 10) || 0) +
    (parseInt(style.marginBottom, 10) || 0)
  );
}

interface CollapseProps {
  in: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  onExited?: () => void;
}

export default function Collapse({
  in: open,
  children,
  className,
  id,
  onExited,
}: CollapseProps) {
  const onExitedRef = useRef(onExited);
  useLayoutEffect(() => {
    onExitedRef.current = onExited;
  }, [onExited]);
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>(open ? "entered" : "exited");
  const statusRef = useRef(status);
  statusRef.current = status;
  const settled = useRef(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open) {
      if (statusRef.current === "entered" || statusRef.current === "entering")
        return;
      // Measured from zero while the panel is still hidden, exactly like the old onEnter.
      node.style.height = "0";
      setStatus("entering");
    } else {
      if (statusRef.current === "exited" || statusRef.current === "exiting")
        return;
      node.style.height = `${outerHeight(node)}px`;
      void node.offsetHeight; // reflow, so the collapse has a start height to animate from
      setStatus("exiting");
    }
  }, [open]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (status !== "entering" && status !== "exiting") {
      settled.current = true;
      return;
    }

    settled.current = false;
    node.style.height = status === "entering" ? `${node.scrollHeight}px` : "";

    let timer = 0;
    const finish = () => {
      if (settled.current) return;
      settled.current = true;
      window.clearTimeout(timer);
      node.removeEventListener("transitionend", handleTransitionEnd);
      node.style.height = "";
      setStatus(status === "entering" ? "entered" : "exited");
      if (status === "exiting") onExitedRef.current?.();
    };
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === node) finish();
    };

    const durations = window
      .getComputedStyle(node)
      .transitionDuration.split(",");
    if (durations.every((duration) => (parseFloat(duration) || 0) === 0)) {
      finish();
      return;
    }
    timer = window.setTimeout(finish, FALLBACK_MS);
    node.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      settled.current = true;
      window.clearTimeout(timer);
      node.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [status]);

  return (
    <div
      ref={ref}
      id={id}
      className={[className, STATUS_CLASS[status]].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
