"use client";
import React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";
import { Todo, TypedColumn } from "@/types/types";

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TodoCardProps) => {
  return (
    <div ref={innerRef} {...dragHandleProps} {...draggableProps} className="bg-background rounded-md space-y-2 drop-shadow-md">
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        {/* <Button size="icon" className="rounded-full bg-red-500 hover:bg-red-600 w-6 h-6 shrink-0"><Icons.close className="w-4 h-4" /></Button> */}

        {/* //todo add image  */}
      </div>
    </div>
  );
};

export default TodoCard;
