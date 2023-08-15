import { cva, VariantProps } from "class-variance-authority";
import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { TodoType } from "../types";

const CardVariants = cva(
  " sm:w-full text-center p-2 my-2 rounded-sm shadow-sm self-center m-2",
  {
    variants: {
      variant: {
        default:
          "border-black border-2 border-opacity-60 focus:ring-2 focus:ring-offset-[4px] ring-[#000]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps extends TodoType, VariantProps<typeof CardVariants> {
  className?: string;
}

export const TodoCard: FunctionComponent<CardProps> = ({
  className,
  variant,
  ...props
}) => {
  return <div className={cn(CardVariants({ variant, className }))}></div>;
};
