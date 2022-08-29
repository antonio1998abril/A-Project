import React, { useContext } from "react";
import roleAccess from "./roleAccess";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PersonIcon from "../../Icons/PersonIcon";
import IconPersonCard from "../../Icons/IconPersonCard";
import { AuthContext } from "../../../context";
import NewCollaborator from "../../ModalComponents/NewCollaborator"

function Manager() {
  const state = useContext(AuthContext);
  const [itemsDashBoard, setItemsDashBoard] = state.User.itemsDashBoard;
  return (
    <>
      <NewCollaborator />
      <div className="cards ">
        {itemsDashBoard.map((item) => {
          return (
            <div className="containerUser container general_Top" key={item._id}>
              <div className="cardUser">
                <div className="slide slide1">
                  <div className="contentUser">
                    <div className="icon">
                      <PersonIcon />
                    </div>
                  </div>
                </div>

                <div className="slide slide2">
                  <div className="contentUser">
                    <h3>{item.occupation}</h3>

                    <p>
                      {item.name} {item.lastName}.
                    </p>

                    <div>
                      <IconPersonCard item={item} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default roleAccess(Manager);
