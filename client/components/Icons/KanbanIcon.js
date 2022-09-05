import KanbanCreate from "../ModalComponents/KanbanOptions/KanbanCreate";
import KanbanDelete from "../ModalComponents/KanbanOptions/KanbanDelete";
import KanbanUpdate from "../ModalComponents/KanbanOptions/KanbanUpdate";

function KanbanIcon() {
  return (
    <>
      <KanbanCreate />
      &nbsp;
      <KanbanUpdate />
      &nbsp;
      <KanbanDelete />
    </>
  );
}

export default KanbanIcon;
