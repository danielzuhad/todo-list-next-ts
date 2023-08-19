"use client";
import { cva, VariantProps } from "class-variance-authority";
import { FunctionComponent, useState } from "react";
import { cn } from "@/lib/utils";
import { TodoType } from "../app/types";
import { TiDeleteOutline } from "react-icons/ti";
import { BsPencilSquare } from "react-icons/bs";
import { BsCheckSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

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
  onClick?: () => void;
}

export const TodoCard: FunctionComponent<CardProps> = ({
  className,
  variant,
  ...props
}) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [inputActive, setInputActive] = useState(false);
  const [title, setTitle] = useState("");

  const handleDelete = async (id: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-green-500 text-white p-2 mx-2 rounded-sm",
        cancelButton: "btn bg-red-500 text-white p-2 mx-2 rounded-sm",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
      });

      dispatch(fetchTodos());
      swalWithBootstrapButtons.fire(
        "Deleted!",
        "Your Task has been deleted.",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        "Cancelled",
        "Your imaginary Task is safe :)",
        "error"
      );
    }
  };

  const handleSubmit = async (id: number) => {
    if (title === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Title is empty",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      console.log("Response:", response);
      const responseData = await response.json();

      dispatch(fetchTodos());
      setTitle("");
      setInputActive(false);
      // Swal.fire({
      //   position: "top-right",
      //   icon: "success",
      //   title: "Task Created",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const activeHandler = () => {
    setInputActive(!inputActive);
  };

  return (
    <div className="hover:scale-110 duration-300">
      <div className={cn(CardVariants({ variant, className }))}>
        <div className="flex justify-between items-center">
          <div className="flex justify-between w-full">
            {!inputActive ? (
              <h2 className="w-full h-[50%] font-bold text-[1.7em] capitalize">
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
                <BsCheckSquare
                  size={22}
                  className="hover:scale-125 ml-5"
                  onClick={() => handleSubmit(props.id)}
                />
              </div>
            )}

            <div className="flex items-center">
              <BsPencilSquare
                className="hover:scale-125 mx-5"
                size={22}
                onClick={activeHandler}
              />
            </div>
          </div>
          <TiDeleteOutline
            size={33}
            className="hover:scale-125"
            onClick={() => handleDelete(props.id)}
          />
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
    </div>
  );
};
