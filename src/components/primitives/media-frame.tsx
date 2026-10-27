import type { ComponentPropsWithoutRef } from "react";

export function MediaFrame({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`grid aspect-video place-items-center overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)] text-sm text-[var(--color-muted)] ${className}`}
      {...props}
    />
  );
}
