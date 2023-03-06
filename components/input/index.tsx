"use client";

import { classNames } from "commons/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export default function Input({
  label,
  className,
  value = "",
  inputRef,
  ...props
}: InputProps) {
  return (
    <div
      className={classNames(
        "group relative border-b border-solid border-neutral-400 py-1 transition-all duration-200 focus-within:border-lime-500",
        className
      )}
    >
      {label && (
        <div
          className={classNames(
            "pointer-events-none absolute top-5 origin-left text-neutral-400 transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
            value && "-translate-y-full text-xs"
          )}
        >
          {label}
        </div>
      )}
      <input
        ref={inputRef}
        value={value}
        className={classNames("w-full [color-scheme:dark]", label && "pt-4")}
        {...props}
      />
    </div>
  );
}
