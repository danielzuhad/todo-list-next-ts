"use client";

import React, { useEffect } from "react";
import { TodoCard } from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

export default function CardSection() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="flex-wrap flex gap-5">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoCard key={todo.id} id={todo.id} title={todo.title} />
        ))
      ) : (
        <div></div>
      )}
      {/* (<TodoCard id={todos.id} title={todos.title} />)  */}
    </div>
  );
}
