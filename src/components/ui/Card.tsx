import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-harbor/10 bg-white shadow-soft ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
