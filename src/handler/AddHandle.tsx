"use client";

import Swal from "sweetalert2";
import { fetchTodos } from "@/app/api/fetch";
import { store } from "@/redux/store";

type AddHandleProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  api: "http://localhost:3000/api/todo" | `http://localhost:3000/api`;
};

export const AddHandle = async ({ setTitle, title }: AddHandleProps) => {
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
    const response = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    console.log("Response:", response);

    store.dispatch(fetchTodos());
    setTitle("");
  } catch (error) {
    console.error(error);
  }
};
