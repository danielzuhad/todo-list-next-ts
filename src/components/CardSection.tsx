"use client";

import React, { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";
import { TaskType, TodoType } from "@/app/types";
import Modal from "./Modal";

export default function CardSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const dispatch = useDispatch<AppThunkDispatch>();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const openModal = (todo: TodoType) => {
    setIsModalOpen(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  console.log(selectedTodo);

  return (
    <div className="flex-wrap flex gap-5 mt-[4em] w-full justify-center">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={todo.tasks}
            onClick={() => openModal(todo)}
          />
        ))
      ) : (
        <div></div>
      )}
      {isModalOpen && selectedTodo && (
        <Modal
          id={selectedTodo.id}
          title={selectedTodo.title}
          tasks={selectedTodo.tasks}
          close={closeModal}
        />
      )}
    </div>
  );
}
