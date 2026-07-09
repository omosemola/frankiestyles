"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

type MotionButtonProps = HTMLMotionProps<"button"> & Omit<ButtonProps, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref">;

const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-[var(--foreground)] text-[var(--background)] smooth-shadow hover:bg-[#1a1a1a]",
      outline: "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
      ghost: "hover:bg-black/5 text-[var(--foreground)]",
      link: "text-[var(--foreground)] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-12 px-8 py-2",
      sm: "h-9 rounded-md px-4 text-sm",
      lg: "h-14 rounded-md px-10 text-lg",
      icon: "h-12 w-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
