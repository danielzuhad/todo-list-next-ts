"use client";

import Swal from "sweetalert2";
import { fetchTodos } from "@/app/api/fetch";
import { store } from "@/redux/store";
import { TaskType } from "@/app/types";

type AddHandleProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
};

export const AddTodo = async ({ setTitle, title }: AddHandleProps) => {
  if (title === "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Title is empty",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  try {
    const response = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    store.dispatch(fetchTodos());
    setTitle("");
  } catch (error) {
    console.error(error);
  }
};

export const AddTask = async ({
  setTask,
  task,
  id,
  setTasks,
}: {
  setTask: React.Dispatch<React.SetStateAction<string>>;
  task: string;
  id: number;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
}) => {
  if (task === "") {
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
    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    const newTask: TaskType = await response.json();

    setTasks((prevTasks: any) => [...prevTasks, newTask]);

    setTask("");
  } catch (error) {
    console.error(error);
  }
};
