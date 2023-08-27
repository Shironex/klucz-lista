"use client";
import React, { useEffect, useState } from "react";
import useBoardStore from "@/lib/store/board-store";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import Column from "./column";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Column as Columntype } from "@/types/types";

const Board = () => {
  const [loading, setLoading] = useState(false);
  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  console.log(isMediumScreen);

  useEffect(() => {
    // if (projectId && projectId !== BoardStore.projectId) {
    //   BoardStore.setProjectId(projectId);
    // }
    setLoading(true);
    getBoard();
    setLoading(false);
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);
    //? dropped outside the list
    if (!destination) return;

    //? column drag
    if (type === "COLUMN") {
      console.log("column drag");
      const entries = [...board.columns.entries()];

      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      const newColumns = new Map(entries);
      setBoard({ ...board, columns: newColumns });
      return;
    }
    console.log("todo drag");

    const columns = [...board.columns.entries()];
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: Columntype = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const endCol: Columntype = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    };

    if (!startCol || !endCol) return;

    //? if dropped in same column and same position do nothing
    if (source.index === destination.index && startCol == endCol) return;

    const newTodo = startCol.todos;
    const [movedTodo] = newTodo.splice(source.index, 1);

    //? if dropped in same column and different position
    if (startCol === endCol) {
      newTodo.splice(destination.index, 0, movedTodo);
      const newCol = {
        id: startCol.id,
        todos: newTodo,
      };
      const newColumns = new Map([
        ...board.columns.entries(),
        [startCol.id, newCol],
      ]);
      setBoard({ ...board, columns: newColumns });
    } else {
      //? if dropped in different column
      const endTodos = [...endCol.todos];
      endTodos.splice(destination.index, 0, movedTodo);

      const newCol = {
        id: startCol.id,
        todos: newTodo,
      };

      const newEndCol = {
        id: endCol.id,
        todos: endTodos,
      };

      const newColumns = new Map([
        ...board.columns.entries(),
        [startCol.id, newCol],
        [endCol.id, newEndCol],
      ]);
      setBoard({ ...board, columns: newColumns });
    }
  };

  return (
    <div className="h-full p-3">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction={isMediumScreen ? "horizontal" : "vertical"} type="COLUMN">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl ${
                snapshot.isDraggingOver ?? "bg-red-400"
              }`}
            >
              {[...board.columns.entries()].map(([id, column], index) => (
                <Column key={id} id={id} todos={column.todos} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
