import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import TodoCard from "./todo-card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Todo, TypedColumn } from "@/types/types";

interface ColumnProps {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

const idToText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: ColumnProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${snapshot.isDragging ? "bg-red-400" : ""}`}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-primary/50"
                }`}
              >
                <h2 className="flex items-center justify-between font-bold text-xl p-2">
                  {idToText[id]}
                  <div className="flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" className="w-6 h-6 rounded-full">
                          <Icons.add className="h-5 w-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Create new project
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will create a new project and add it to your
                            workspace.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        {/* <CreateProjectForm /> */}
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-6 h-6 rounded-full" size="icon">
                          <Icons.options className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Icons.sort className="mr-2 h-4 w-4" />
                            <span>Sort</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                {/* <Icons.sortAZ className="mr-2 h-4 w-4" /> */}
                                <span>By creation date {"( asc )"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {/* <Icons.sortZA className="mr-2 h-4 w-4" /> */}
                                <span>By creation date {"( desc )"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {/* <Icons.sortAZ className="mr-2 h-4 w-4" /> */}
                                <span>By name {"(A-Z)"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {/* <Icons.sortZA className="mr-2 h-4 w-4" /> */}
                                <span>By name {"(Z-A)"}</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                          <Icons.favorite className="mr-2 h-4 w-4" />
                          <span>Observe</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icons.add className="mr-2 h-4 w-4" />
                          <span>Create schedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icons.chevronRight className="mr-2 h-4 w-4" />
                          <span>Move all task</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icons.archive className="mr-2 h-4 w-4" />
                          <span>Archive this list</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
