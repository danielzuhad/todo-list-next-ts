"use client";

import React, { Suspense, useEffect, useState } from "react";
// import { TodoCard } from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";
import { TodoType } from "@/app/types";

const Modal = React.lazy(() => import("./Modal"));
const TodoCard = React.lazy(() => import("./TodoCard"));

export default function CardSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const dispatch = useDispatch<AppThunkDispatch>();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, isModalOpen]);

  const openModal = (todo: TodoType) => {
    setIsModalOpen(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
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
    </Suspense>
  );
}
