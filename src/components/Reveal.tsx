import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span";
};

/**
 * Pure-CSS scroll reveal: content is visible by default and animates in via
 * `animation-timeline: view()` where supported. `delay` staggers the reveal by
 * shifting the scroll range at which the animation starts.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const Tag = as as any;
  // Each 100ms of delay pushes the animation start ~3% further into the entry range.
  const style = {
    "--reveal-start": `entry ${5 + Math.round(delay / 33)}%`,
  } as CSSProperties;

  return (
    <Tag style={style} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
