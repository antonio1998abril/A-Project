import React, { memo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";

function TaskCard({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              color: "white",
              borderRadius: "4px",
              ...provided.draggableProps.style,
            }}
          >
            <div className="content-card">
              <Image
                /*  src={item?.userImage?.url} */
                src="https://res.cloudinary.com/antoapex19/image/upload/v1661865888/A-Project/lxtqvxbrfxcnlpck0rme.jpg"
                width={50}
                height={50}
              />

              {item.content}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
};

export default memo(TaskCard);
