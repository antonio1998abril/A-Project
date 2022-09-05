import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import roleAccess from "../roleAccess";
import Column from "./Column";
import { status } from "./mock";
import KanbanIcon from "../../../Icons/KanbanIcon";
import { loginService } from "../../../../service/loginService";
import { useRouter } from 'next/router'


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Index() {
  const [columns, setColumns] = useState(status);
  const { get} = loginService();

  const router = useRouter()
  const { pid } = router.query

  console.log(router.query);
  useEffect(()=>{
    
  },[])

  return (
    <div className="content-wrap">
      <br />
      <div className="cardKanban">
        <div className="card position-kanban-tools">
          <div className="card-body">
            <h6 className="card-title text-center">Options</h6>
            <KanbanIcon />
          </div>
        </div>
      </div>
      <br />
      <div
        className="kanaban-grid" /* style={{ display: "flex", justifyContent: "center", height: "100%" }} */
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                key={columnId}
              >
                <h5 className="card-title text-center">{column.name}</h5>
                <div style={{ margin: 2 }}>
                  <Column
                    droppableId={columnId}
                    key={columnId}
                    index={index}
                    column={column}
                  />
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default roleAccess(Index);
