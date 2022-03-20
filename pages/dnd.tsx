import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Dnd() {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  const [todos, setTodos] = useState({
    id: "1",
    title: "공부",
    lesson: ["a", "b", "c"]
  });
  const handleChange = (result: any) => {
    if (!result.destination) return;
    console.log(result);
    const items = [...todos.lesson];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos({ ...todos, lesson: [...items] });
    console.log("새로정렬", items);
  };
  return (
    winReady && (
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="todos">
          {provided => (
            <ul
              className="todos"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.lesson.map((el, index) => (
                <Draggable key={el} draggableId={el} index={index}>
                  {provided => (
                    <li
                      css={css`
                        cursor: grab;
                      `}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {el}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    )
  );
}

export default Dnd;
