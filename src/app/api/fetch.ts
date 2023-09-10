import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodo", async () => {
  const response = await fetch("/api/todo", {
    method: "GET",
  });
  const data = await response.json();
  return data;
});
