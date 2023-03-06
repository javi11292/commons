"use client";

import { useRef, useState } from "react";

import { useEvent } from "commons/hooks";
import { classNames } from "commons/utils";

export default function Transition({
  show,
  children,
  className,
  transitionClassName,
  onTransitionEnd,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "onTransitionEnd"> & {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  transitionClassName: string;
  onTransitionEnd?: (
    event: React.TransitionEvent<HTMLDivElement>,
    transition: boolean
  ) => void;
}) {
  const [transition, setTransition] = useState(false);
  const root = useRef<HTMLDivElement>();
  const observer = useRef() as React.MutableRefObject<IntersectionObserver>;

  if (!observer.current && typeof window !== "undefined") {
    observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        setTransition(true);
      }
    });
  }

  const handleRef = useEvent((target: HTMLDivElement) => {
    if (target) {
      observer.current.observe(target);
    } else if (root.current) {
      observer.current.unobserve(root.current);
    }

    root.current = target;
  });

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (!show) {
      setTransition(false);
    }
    onTransitionEnd?.(event, show);
  };

  if (!show && !transition) return null;

  return (
    <div
      ref={handleRef}
      className={classNames(
        "transition-all",
        className,
        show && transition && transitionClassName
      )}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {children}
    </div>
  );
}
