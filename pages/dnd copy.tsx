import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Dnd() {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  const [todos, setTodos] = useState([
    { id: "1", title: "공부", lesson: ["a", "b", "c"] },
    { id: "2", title: "헬스", lesson: ["d", "e", "f"] },
    { id: "3", title: "독서", lesson: ["g", "h", "ic"] },
    { id: "4", title: "산책", lesson: ["sad", "b12", "c32"] },
    { id: "5", title: "요리", lesson: ["12312a", "b112", "c11"] }
  ]);
  const handleChange = (result: any) => {
    if (!result.destination) return;
    console.log(result);
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
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
              {todos.map(({ id, title, lesson }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <li
                      css={css`
                        cursor: grab;
                      `}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {title}
                      <div>
                        {lesson.map((el, i) => (
                          <span key={i}>{el}</span>
                        ))}
                      </div>
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
