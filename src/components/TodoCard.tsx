import { cva, VariantProps } from "class-variance-authority";
import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import { TodoType } from "../app/types";

const CardVariants = cva(
  "inline-block sm:min-w-[18em] md:min-w-[22em] h-[20vh] rounded-md shadow-md  duration-300 cursor-pointer border-opacity-80 p-4 flex flex-col gap-3 hover:scale-110 animate-fade-up animate-ease-out",
  {
    variants: {
      variant: {
        default: "bg-white border-2 border-black  text-black",
        dark: "",
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
  return (
    <div className={cn(CardVariants({ variant, className }))}>
      <h2 className="w-full h-[50%] font-bold text-[2em] capitalize">
        {props.title}
      </h2>
      <div className="flex justify-between h-full ">
        <div className="w-[50%] h-[7vh] overflow-auto font-extralight text-sm ">
          {props.tasks && props.tasks.length > 0 ? (
            props.tasks?.map((task) => (
              <ul key={task.id}>
                <li>{task.task}</li>
              </ul>
            ))
          ) : (
            <div>Buatlah beberapa Task </div>
          )}
        </div>
        <div className="flex justify-center items-center px-5 border-2 rounded-full mr-5">
          {props.tasks && props.tasks.length > 0 ? (
            <div>
              {Math.round(
                (props.tasks.filter((task) => task.isDone).length /
                  props.tasks!.length) *
                  100
              )}
              %
            </div>
          ) : (
            <div>0 %</div>
          )}
        </div>
      </div>
    </div>
  );
};
