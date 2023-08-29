"use client";
import { useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TaskType, TodoType } from "@/app/types";
import { FunctionComponent } from "react";
import { AiFillPlusCircle, AiOutlineCheckSquare } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { DeleteHandle } from "@/handler/DeleteHandle";
import { AddHandle } from "@/handler/AddHandle";
import { BsPencilSquare } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { AppThunkDispatch, store } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";
import { useDispatch } from "react-redux";

const modalVariants = cva(
  " w-[100vw] h-[100vh] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(49,49,49,0.8)] flex justify-center items-center absolute z-10",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ModalProps
  extends TodoType,
    VariantProps<typeof modalVariants> {
  className?: string;
  close?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ variant, ...props }) => {
  // const dispatch = useDispatch<AppThunkDispatch>();
  const initialTasks = props.tasks?.map((task) => ({
    ...task,
    isInputActive: false,
  }));
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState<string>("");

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  console.log(title, "state");
  return (
    <div className={cn(modalVariants({ variant }))}>
      <div className="rounded-md duration-300 inline-flex h-[80vh] md:w-[70vw] sm:w-[80vw] lg:w-[50vw] bg-white p-3 flex-col  items-center animate-fade-up animate-ease-out ">
        <div className="flex w-[90%] items-center justify-between my-5">
          <h2 className="font-bold text-4xl">{props.title}</h2>
          <button>
            <TiDeleteOutline size={50} onClick={props.close} />
          </button>
        </div>
        <div className="flex flex-col items-center w-[50%] h-[80%] min-w-[15em] gap-5 mt-10">
          {/* Tasks */}
          {tasks?.map((task, index) => (
            <div
              key={task.id}
              className="flex items-center justify-between w-[100%] border-2 p-2 "
            >
              {task.isInputActive ? (
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 w-full border-2"
                  value={title}
                />
              ) : (
                <h3>{task.task}</h3>
              )}
              <div className="flex items-center gap-2">
                {task.isDone ? (
                  <button>
                    <AiOutlineCheckSquare size={30} color="green" />
                  </button>
                ) : (
                  <button>
                    <TbProgress size={30} color="red" />
                  </button>
                )}
                <button>
                  {/* Toggle Input */}
                  {task.isInputActive ? (
                    <AiFillPlusCircle
                      size={30}
                      onClick={() => AddHandle({ setTitle, title })}
                    />
                  ) : (
                    <BsPencilSquare
                      size={25}
                      onClick={() => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index].isInputActive = !task.isInputActive;
                        setTasks(updatedTasks);
                      }}
                    />
                  )}
                </button>
                <button>
                  <DeleteHandle idProps={props.id} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
