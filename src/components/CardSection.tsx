"use client";

import React, { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";
import { TaskType } from "@/app/types";

export default function CardSection() {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppThunkDispatch>();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const openModal = (task: TaskType) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-wrap flex gap-5 mt-[4em] w-full justify-center">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={todo.tasks}
            onClick={() => openModal(todo.tasks![0])}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
