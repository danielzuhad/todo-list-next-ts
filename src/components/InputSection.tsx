"use client";
import React, { useState } from "react";
import { Input } from "./Input";
import Submit from "./Submit";
import { AddTodo } from "@/handler/AddHandle";

export default function InputSection() {
  const [title, setTitle] = useState<string>("");

  return (
    <div className="flex sm:flex-col min-w-[40vw] md:flex-row justify-center items-center md:items-center mt-[2em]">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Submit onClick={() => AddTodo({ setTitle, title })} />
    </div>
  );
}
