export interface ToDoModel {
  id: number;
}

export interface UserModel {
  username: string;
  email: string;
  id: number;
  createdAt: Date;
  image: string | null;
  isadmin: boolean;
  todos: ToDoModel[];
}

export interface UserModelAdmin {
  username: string;
  email: string;
  id: number;
  createdAt: Date;
  image: string | null;
  isadmin: boolean;
}
