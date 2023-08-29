"use client";
import { cva, VariantProps } from "class-variance-authority";
import { FunctionComponent, useState } from "react";
import { cn } from "@/lib/utils";
import { TodoType } from "../app/types";
import { BsPencilSquare } from "react-icons/bs";
import { DeleteHandle } from "@/handler/DeleteHandle";
import { UpdateHandle } from "@/handler/UpdateHandle";

const CardVariants = cva(
  "inline-block sm:min-w-[18em] md:min-w-[22em] h-[20vh] rounded-md shadow-md  duration-300 cursor-pointer border-opacity-80 p-4 flex flex-col gap-3 hover:scale-110 animate-fade-up animate-ease-out hover:shadow-2xl",
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
  onClick?: () => void;
}

export const TodoCard: FunctionComponent<CardProps> = ({
  className,
  variant,
  onClick,
  ...props
}) => {
  const [inputActive, setInputActive] = useState(false);
  const [title, setTitle] = useState("");

  const activeHandler = () => {
    setInputActive(!inputActive);
  };

  return (
    <div className={cn(CardVariants({ variant, className }))}>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full">
          {!inputActive ? (
            <h2 className="w-full h-[50%] font-bold text-[1.7em] capitalize overflow-hidden">
              {props.title}
            </h2>
          ) : (
            <div className="flex justify-between items-center">
              <input
                className="p-2 w-[12em] border-2 rounded-sm"
                type="text"
                placeholder="Masukan Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <UpdateHandle
                idProps={props.id}
                setTitle={setTitle}
                setInputActive={setInputActive}
                title={title}
              />
            </div>
          )}

          <div className="flex items-center">
            <BsPencilSquare
              className="hover:scale-125 mx-5"
              size={22}
              onClick={activeHandler}
            />
            <DeleteHandle idProps={props.id} />
          </div>
        </div>
      </div>

      <div className="flex justify-between h-full items-center">
        <div className="w-[50%] h-[10vh] overflow-auto font-extralight text-sm ">
          {props.tasks && props.tasks.length > 0 ? (
            props.tasks?.map((task) => (
              <ul key={task.id}>
                {task.isDone === true ? (
                  <li className="line-through	">{task.task}</li>
                ) : (
                  <li>{task.task}</li>
                )}
              </ul>
            ))
          ) : (
            <div>Buatlah beberapa Task </div>
          )}
        </div>
        <button
          onClick={onClick}
          className="font-light text-xs hover:font-bold"
        >
          Edit Task
        </button>
        <div className="flex justify-center items-center py-6 px-3 h-3 border-2 rounded-full mr-5 ">
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
