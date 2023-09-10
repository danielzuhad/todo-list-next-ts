"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TaskType, TodoType } from "@/app/types";
import { FunctionComponent } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDoneAll } from "react-icons/md";
import { DeleteTask } from "@/handler/DeleteHandle";
import { AddTask } from "@/handler/AddHandle";
import { BsPencilSquare } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { UpdateTask, UpdateTaskDone } from "@/handler/UpdateHandle";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

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
  const dispatch = useDispatch<AppThunkDispatch>();
  const initialTasks = useMemo(
    () =>
      props.tasks?.map((task) => ({
        ...task,
        isInputActive: false,
      })) || [],
    [props.tasks]
  );

  // Use State
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [updateTask, setUpdateTask] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={cn(modalVariants({ variant }))}>
      <div className="rounded-md duration-300 inline-flex h-[80vh] md:w-[70vw] sm:w-[80vw] lg:w-[50vw] bg-white p-3 flex-col  items-center animate-fade-up animate-ease-out ">
        <div className="flex w-[90%] items-center justify-between my-5">
          <div className="mt-5">
            <h2 className="font-bold text-4xl">{props.title}</h2>
          </div>
          <button className="hover:scale-110">
            <TiDeleteOutline size={50} color="" onClick={props.close} />
          </button>
        </div>

        {/* Add Task */}
        <div className="flex flex-col items-center lg:w-[50%] md:w-[70%] sm:w-[80%] w-[50%] h-[80%] gap-5 mt-10 ">
          <div>Make Some Tasks</div>
          <div className="flex items-center justify-between w-[100%] border-2 p-2 ">
            <input
              placeholder="Type here and enter button on the right"
              onChange={(e) => setNewTask(e.target.value)}
              className="p-2 w-[85%] border-2"
              value={newTask}
            />
            <button className="hover:scale-110 ">
              <IoMdAddCircleOutline
                size={45}
                onClick={() =>
                  AddTask({
                    setTask: setNewTask,
                    task: newTask,
                    id: props.id,
                    setTasks,
                  })
                }
              />
            </button>
          </div>

          {/* Tasks */}
          <div className="flex flex-col items-center w-[100%] h-[65%]  gap-5 overflow-auto px-3">
            <Suspense fallback={<div>Loading</div>}>
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between w-[100%]  border-2 p-2 animate-fade-up animate-ease-out animate-300"
                >
                  {task.isInputActive ? (
                    <div className="flex items-center w-full gap-1">
                      <input
                        onChange={(e) => setUpdateTask(e.target.value)}
                        className="p-2 w-full border-2"
                        value={updateTask}
                      />
                    </div>
                  ) : (
                    <h3>{task.task}</h3>
                  )}
                  <div className="flex items-center gap-2 ml-2">
                    {/* Problem is here ChatGPT */}
                    <button
                      onClick={() =>
                        UpdateTaskDone({
                          id: task.id,
                          isDone: task.isDone,
                          setTasks,
                        })
                      }
                    >
                      {task.isDone ? (
                        <MdOutlineDoneAll size={30} color="green" />
                      ) : (
                        <TbProgress size={30} color="red" />
                      )}
                    </button>

                    {/* Toggle Input */}
                    <button
                      onClick={() => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index].isInputActive = !task.isInputActive;
                        setTasks(updatedTasks);
                      }}
                    >
                      <BsPencilSquare size={25} />
                    </button>

                    {/* Update Task */}
                    <button>
                      {task.isInputActive ? (
                        <AiFillCheckSquare
                          onClick={() => {
                            UpdateTask({
                              id: task.id,
                              updateTask,
                              setUpdateTask: setUpdateTask,
                              setTasks,
                            });
                            setUpdateTask("");
                          }}
                          className="mr-2"
                          size={30}
                        />
                      ) : (
                        <TiDeleteOutline
                          size={30}
                          onClick={() => DeleteTask({ id: task.id, setTasks })}
                        />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
