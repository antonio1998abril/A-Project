import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PersonIcon from "../../Icons/PersonIcon";
import IconPersonCard from "../../Icons/IconPersonCard";
import roleAccess from "./roleAccess";
import NewCollaborator from "../../ModalComponents/NewCollaborator"
import { AuthContext } from "../../../context";


function Admin() {
  const state = useContext(AuthContext);
  const [itemsDashBoard,setItemsDashBoard] = state.User.itemsDashBoard

  return (
    <>
     
     <NewCollaborator />
      <div className="cards ">
        {itemsDashBoard.map((item) => {
          return (
            <div
              className="containerUser container general_Top"
              key={item._id}
            >
              <div className="cardUser" >
                <div className="slide slide1">
                  <div className="contentUser">
                    <div className="icon">
                      <PersonIcon  />
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

export default roleAccess(Admin);
