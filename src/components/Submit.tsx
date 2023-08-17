import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { PuffLoader } from "react-spinners";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-sm text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400  disabled:pointer-events-none p-[0.7em] sm:w-full mt-2 m-2 md:w-[5em]",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-[#ADC4CE] focus:ring-offset-[4px] ring-[#000]",
        dark: "bg-transparent hover:text-slate-900 hover:bg-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <PuffLoader color="black" className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      Submit
    </button>
  );
};

export default Button;
