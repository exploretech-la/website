import type { ComponentProps } from "react";
import GA from "../util/GoogleAnalytics";

type Props = ComponentProps<"a"> & { eventLabel: string };

export default function OutboundLink({
  eventLabel,
  target,
  href,
  onClick,
  rel,
  ...props
}: Props) {
  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : rel}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const sameWindow =
          target !== "_blank" &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.metaKey &&
          !event.altKey &&
          event.button !== 1;
        if (sameWindow && href) {
          event.preventDefault();
          GA.trackOutbound(eventLabel, () => {
            window.location.href = href;
          });
        } else {
          GA.trackOutbound(eventLabel, () => {});
        }
      }}
    />
  );
}
