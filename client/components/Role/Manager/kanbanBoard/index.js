import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import roleAccess from "../roleAccess";
import Column from "./Column";
/* import { status } from "./mock"; */
/* import { loginService } from "../../../../service/loginService";
 */
import { useRouter } from "next/router";
import { adminService } from "../../../../service/adminService";
import KanbanCreate from "../../../ModalComponents/KanbanOptions/KanbanCreate";

import { v4 as uuid } from "uuid";
import { AuthContext } from "../../../../context";

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
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;

  const [columns, setColumns] = useState([]);

  const { getCollaboratorInfo, getTasks } = adminService();
  const [collaborator, setCollaborator] = useState({});
  const router = useRouter();
  /* Totals */
  const [lowGraph, setLowGraph] = useState([]);
  const [mediumGraph, setMediumGraph] = useState([]);
  const [highGraph, setHighGraph] = useState([]);

  /* functions callbacks */
  const catchCollaborator = async (id) => {
    const res = await getCollaboratorInfo(id);
    setCollaborator(res?.data);
  };

  const catchListTasks = async (id) => {
    const res = await getTasks(id);

    const lowLevel = res?.data?.todo.map((item, index) => {
      if (item.importanceLevel === "low") lowGraph.push(item.importanceLevel);
      if (item.importanceLevel === "medium")
mediumGraph.push(item.importanceLevel)
      if (item.importanceLevel === "high") highGraph.push(item.importanceLevel);
    });

    const mediumLevel = res?.data?.inProgress.map((item, index) => {
      if (item.importanceLevel === "low")  lowGraph.push(item.importanceLevel);
      if (item.importanceLevel === "medium")
      mediumGraph.push(item.importanceLevel)
      if (item.importanceLevel === "high") highGraph.push(item.importanceLevel);
    });

    const hightLevel = res?.data?.review.map((item, index) => {
      if (item.importanceLevel === "low")  lowGraph.push(item.importanceLevel);
      if (item.importanceLevel === "medium")
      mediumGraph.push(item.importanceLevel)
      if (item.importanceLevel === "high") highGraph.push(item.importanceLevel);
    });

    const completedLevel = res?.data?.completed.map((item, index) => {
      if (item.importanceLevel === "low") lowGraph.push(item.importanceLevel);
      if (item.importanceLevel === "medium")
      mediumGraph.push(item.importanceLevel)
      if (item.importanceLevel === "high") highGraph.push(item.importanceLevel);
    });

    setColumns({
      [uuid()]: {
        name: "To do",
        color: "#D5DBDB",
        items: res?.data?.todo,
      },
      [uuid()]: {
        name: "In Progress",
        color: "#D5DBDB",
        items: res?.data?.inProgress,
      },
      [uuid()]: {
        name: "Review",
        color: "#D5DBDB",
        items: res?.data?.review,
      },
      [uuid()]: {
        name: "Completed",
        color: "#E3FCEF",
        items: res?.data?.completed,
      },
    });
  };

  useEffect(() => {
    catchCollaborator(router?.query?.keyword);
    catchListTasks(router?.query?.keyword);
  }, [callback]);

  return (
    <div className="content-wrap">
      <br />

 {/*      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Task</h5>
          <p className="card-text">
            Low Priority:{lowGraph.length} &nbsp;
            Medium Priority:{mediumGraph.length} &nbsp;
            hight Priority: {highGraph.length}
          </p>
        </div>
      </div>
      <br />
      <br /> */}
      <div className="cardKanban">
        <div className="card position-kanban-tools">
          <div className="card-body">
            <h6 className="card-title text-center">New Task</h6>
            <KanbanCreate id={router?.query?.keyword} />
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
              <div key={columnId}>
                <h5 className="card-title text-center">{column.name}</h5>
                <div style={{ margin: 2 }}>
                  <Column
                    droppableId={columnId}
                    key={columnId}
                    index={index}
                    column={column}
                    collaborator={collaborator}
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
