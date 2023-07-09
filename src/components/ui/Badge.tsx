import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "rounded-full   flex justify-center items-center text-white duration-300 !leading-[0]",
  {
    variants: {
      variant: {
        default: "text-white bg-indigo-500 group-hover:bg-indigo-600",
        green: "text-white bg-green-500 group-hover:bg-green-600",
        balck: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      },
      size: {
        default: "text-xs w-5 h-5 ",
        lg: "w-6 h-6",
        sm: "w-4 h-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, size, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Badge;
