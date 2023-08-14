export interface Todo {
  id: number;
  title: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  task: string;
  isDone: boolean;
  todoId: number;
}
