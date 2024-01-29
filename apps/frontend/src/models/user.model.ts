export interface ToDoModel {
  id: number;
}

export interface UserModel {
  username: string;
  email: string;
  id: number;
  createdAt: Date;
  image: string;
  todos: ToDoModel[];
}
