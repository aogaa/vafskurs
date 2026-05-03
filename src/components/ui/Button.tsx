import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type LinkButtonProps = BaseProps & {
  to: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-harbor text-white shadow-soft hover:-translate-y-0.5 hover:bg-pine",
  secondary:
    "border border-harbor/20 bg-white/76 text-harbor shadow-sm hover:-translate-y-0.5 hover:border-harbor/40 hover:bg-white",
  ghost: "text-harbor hover:bg-harbor/8",
};

const baseClasses =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-clay";

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${className}`;

  if (props.to !== undefined) {
    return (
      <Link className={classes} to={props.to}>
        {children}
      </Link>
    );
  }

  const {
    className: _className,
    variant: _variant,
    children: _children,
    to: _to,
    ...buttonProps
  } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
