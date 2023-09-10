"use client";
import { useDispatch } from "react-redux";
import { BsCheckSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { AppThunkDispatch, store } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

type UpdateHandleProps = {
  idProps: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setInputActive: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

export const UpdateTodo = ({
  idProps,
  setTitle,
  setInputActive,
  title,
}: UpdateHandleProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleUpdate = async (id: number) => {
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
      const response = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      console.log("Response:", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Title updated",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchTodos());
      setTitle("");
      setInputActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BsCheckSquare
      size={22}
      className="hover:scale-125 ml-5"
      onClick={() => handleUpdate(idProps)}
    />
  );
};

export const UpdateTask = async ({
  id,
  updateTask,
  setUpdateTask,
  done,
  setTasks,
}: {
  id: number;
  updateTask?: string;
  setUpdateTask?: React.Dispatch<React.SetStateAction<string>>;
  done?: boolean;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
}) => {
  if (updateTask === "") {
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
    const response = await fetch(`/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: updateTask, isDone: done }),
    });
    console.log("Response:", response);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Task updated",
      showConfirmButton: false,
      timer: 1500,
    });

    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task.id === id
          ? { ...task, isInputActive: false, task: updateTask }
          : task
      )
    );
    setUpdateTask!("");
  } catch (error) {
    console.error(error);
  }
};

export const UpdateTaskDone = async ({
  id,
  isDone,
  setTasks,
}: {
  id: number;
  isDone?: boolean;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const isDoneChange = !isDone;

  try {
    const response = await fetch(`/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: isDoneChange }),
    });
    console.log("Response:", response);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Progress Updated",
      showConfirmButton: false,
      timer: 1500,
    });

    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task.id === id
          ? { ...task, isInputActive: false, isDone: isDoneChange }
          : task
      )
    );
  } catch (error) {
    console.error(error);
  }
};
