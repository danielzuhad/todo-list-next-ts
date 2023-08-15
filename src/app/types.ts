export interface TodoType {
  id: number;
  title: string;
  tasks?: TaskType[];
}

export interface TaskType {
  id: number;
  task: string;
  isDone: boolean;
  todoId: number;
}
