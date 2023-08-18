import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType, TaskType } from "../../app/types";
import { fetchTodos } from "@/app/api/fetch";

interface TodoState {
  todos: TodoType[];
  loading?: boolean;
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },

    updateTodo: (state, action: PayloadAction<TodoType>) => {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    addTask: (
      state,
      action: PayloadAction<{ todoId: number; task: TaskType }>
    ) => {
      const { todoId, task } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.tasks?.push(task);
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ todoId: number; task: TaskType }>
    ) => {
      const { todoId, task } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.tasks = todo.tasks ?? [];
        const index = todo.tasks?.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          todo.tasks[index] = task;
        }
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{ todoId: number; taskId: number }>
    ) => {
      const { todoId, taskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.tasks = todo.tasks?.filter((task) => task.id !== taskId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  addTask,
  updateTask,
  deleteTask,
} = todoSlice.actions;

export default todoSlice.reducer;
