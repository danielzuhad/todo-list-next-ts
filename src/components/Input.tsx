import { cva, VariantProps } from "class-variance-authority";
import { FunctionComponent, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
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

export interface InputProps
  extends Partial<InputHTMLAttributes<HTMLInputElement>>,
    VariantProps<typeof inputVariants> {}

export const Input: FunctionComponent<InputProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <input
      placeholder="Make Some Tasks"
      type="text"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
};
