import { Board, Todo, TypedColumn, Column } from "@/types/types";
import { create } from "zustand";

interface BoardStore {
  board: Board;
  projectId: string | null;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  setProjectId: (projectid: string) => void;
  updateTodo: (todo: Todo, columndId: TypedColumn) => void;
}

const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  projectId: null,
  getBoard: async () => {
    // const projectId = get().projectId;
    // if (!projectId) return [];
    const board = await getBoard("");
    set({ board });
  },
  setBoard: (board) => set({ board }) ,
  setProjectId: (projectId) => {
    set({ projectId });
  },
  updateTodo: (todo, columnId) => {
    //TODO update the todo in the database search for the todo in the db by id and replace status with columnId
  }
}));

export default useBoardStore;

const todos: Todo[] = [
  {
    id: "1",
    title: "Implement binary search",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Refactor code to use SOLID principles",
    status: "todo",
  },
  {
    id: "3",
    title: "Write unit tests for authentication module",
    status: "done",
  },
  {
    id: "4",
    title: "Create REST API for user management",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Implement OAuth2 authentication",
    status: "todo",
  },
  {
    id: "6",
    title: "Optimize database queries",
    status: "done",
  },
  {
    id: "7",
    title: "Create a custom webpack plugin",
    status: "in-progress",
  },
  {
    id: "8",
    title: "Implement pagination for search results",
    status: "todo",
  },
  {
    id: "9",
    title: "Refactor code to use async/await",
    status: "done",
  },
];

const getBoard = async (projectId: string) => {
  //TODO Query the database for the board
  console.log(todos);
  const columns = todos.reduce((acc, todo) => {
    const column = acc.get(todo.status);
    //? if columns is not defined, create it
    if (!column) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      id: todo.id,
      title: todo.title,
      status: todo.status,
      //? if todo.image is undefined, don't add it to the object
      ...(todo.image && { image: todo.image }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  //TODO Dynamic column creation
  const ColumnTyoe: TypedColumn[] = ["todo", "in-progress", "done"];
  for (const columnType of ColumnTyoe) {
    if (!columns.has(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  //TODO sort by local storage if it exists or by default
  const sortedColumns = new Map<TypedColumn, Column>(
    [...columns.entries()].sort((a, b) => {
      const aIndex = ColumnTyoe.indexOf(a[0]);
      const bIndex = ColumnTyoe.indexOf(b[0]);
      return aIndex - bIndex;
    })
  );

  const board: Board = {
    columns: sortedColumns,
  };
  console.log(board);

  return board;
};
