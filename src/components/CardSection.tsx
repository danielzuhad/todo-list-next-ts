"use client";

import React, { useEffect } from "react";
import { TodoCard } from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

export default function CardSection() {
  const dispatch = useDispatch<AppThunkDispatch>();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  console.log(todos);

  return (
    <div className="flex-wrap flex gap-5 mt-[4em] w-full justify-center">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={todo.tasks}
          />
        ))
      ) : (
        <div></div>
      )}
      {/* (<TodoCard id={todos.id} title={todos.title} />)  */}
    </div>
  );
}
