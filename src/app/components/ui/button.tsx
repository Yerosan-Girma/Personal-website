import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

/**
 * Button component with variants and sizes for premium portfolio design
 * 
 * Requirements:
 * - 2.8: Hover colors with 10% luminosity shift
 * - 20.2: Focus indicators with 3px outline
 * - 20.4: ARIA labels and accessibility attributes
 * - 20.7: Keyboard navigation support
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-[3px] focus-visible:outline-ring focus-visible:outline-offset-2 focus:ring-[3px] focus:ring-ring/50",
  {
    variants: {
      variant: {
        // Primary variant - accent background (Requirement 2.8, 20.2)
        primary: "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg hover:scale-105 active:scale-100",
        
        // Secondary variant - subtle background (Requirement 2.8, 20.2)
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:shadow-md",
        
        // Outline variant - bordered with no fill (Requirement 2.8, 20.2)
        outline: "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground hover:shadow-md",
      },
      size: {
        // Small size (Requirement 20.7)
        small: "h-8 px-4 py-2 text-sm",
        
        // Medium size - default (Requirement 20.7)
        medium: "h-10 px-6 py-3 text-base",
        
        // Large size (Requirement 20.7)
        large: "h-12 px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component for user interactions
 * 
 * @param variant - Visual style: primary, secondary, or outline
 * @param size - Button size: small, medium, or large
 * @param asChild - Render as child component using Radix Slot
 * 
 * Accessibility features:
 * - Keyboard navigation support (focusable, activatable with Enter/Space)
 * - 3px focus indicators for visibility (Requirement 20.2)
 * - Disabled state properly communicated to assistive technologies
 * - ARIA attributes passed through via props (Requirement 20.4)
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
