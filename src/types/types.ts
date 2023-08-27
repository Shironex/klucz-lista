export interface Board {
  columns: Map<TypedColumn, Column>;
}

export type TypedColumn = "todo" | "in-progress" | "done";

export interface Column {
  id: TypedColumn;
  todos: Todo[];
}

export interface Todo {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  image?: Image;
}

export interface Image {
  bucketId: string;
  Id: string;
}
