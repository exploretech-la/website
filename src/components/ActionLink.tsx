import type { AnchorHTMLAttributes } from "react";

/**
 * React Bootstrap rendered `<Button href>` through SafeAnchor, which swallowed the
 * Space key so the page never scrolled while a call-to-action link had focus.
 * Native anchors scroll instead, so the behavior is kept explicitly here.
 */

export default function ActionLink({
  onKeyDown,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      onKeyDown={(event) => {
        if (event.key === " ") event.preventDefault();
        onKeyDown?.(event);
      }}
    />
  );
}
