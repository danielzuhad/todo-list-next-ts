"use client";
import React, { useState } from "react";
import { Input } from "./Input";
import Submit from "./Submit";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

export default function InputSection() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
      const responseData = await response.json();

      dispatch(fetchTodos());
      setTitle("");
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

  return (
    <div className="flex sm:flex-col min-w-[40vw] md:flex-row justify-center items-center md:items-center mt-[2em]">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Submit onClick={handleSubmit} />
    </div>
  );
}
