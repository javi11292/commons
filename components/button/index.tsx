"use client";

import Link, { LinkProps } from "next/link";

import LoadingIcon from "commons/components/loading-icon";
import { classNames } from "commons/utils";

const variantClassName = {
  contained: "bg-lime-500 text-black",
  outlined: "text-lime-500 border border-solid border-current",
  text: null,
} as const;

type ConditionalProps =
  | ({ href?: never } & React.HTMLAttributes<HTMLSpanElement>)
  | LinkProps;

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  icon?: boolean;
  variant?: "contained" | "outlined" | "text";
  disableUpperCase?: boolean;
  loading?: boolean;
} & ConditionalProps;

export default function Button({
  variant = "text",
  disableUpperCase,
  icon,
  className,
  loading,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const componentClassName = classNames(
    "hover-effect relative cursor-pointer overflow-hidden",
    loading && "pointer-events-none",
    className,
    icon ? "material-icons rounded-full p-2" : "rounded py-2 px-4 font-bold",
    !disableUpperCase && !icon && "text-sm uppercase",
    variantClassName[variant]
  );

  const content = (
    <>
      <span
        className={classNames(
          "transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
      </span>
      {loading && (
        <LoadingIcon className="absolute inset-0 top-2/4 left-2/4 [translate:-50%_-50%]" />
      )}
    </>
  );

  if (props.href) {
    return (
      <Link {...props} className={componentClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <span
      {...props}
      className={componentClassName}
      onClick={loading ? undefined : onClick}
    >
      {content}
    </span>
  );
}
