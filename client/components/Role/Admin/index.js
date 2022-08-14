import { useEffect } from "react";
import { useRouter } from "next/router";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PersonIcon from "../../Icons/PersonIcon";
import IconPersonCard from "../../Icons/IconPersonCard";
import roleAccess from "./roleAccess";

function Admin() {
  const userAdded = [
    {
      id: "1A",
      name: "Emanuel",
      lastName: "Sanchez",
    },
    {
      id: "2B",
      name: "David",
      lastName: "Hinojosa",
    },
    {
      id: "3C",
      name: "Antonio",
      lastName: "Rodriguez",
    },
    {
      id: "4D",
      name: "Susan",
      lastName: "Taylor",
    },
    {
      id: "5F",
      name: "Fey",
      lastName: "Conor",
    },
  ];
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            Create a <strong>new user or change his current role</strong>.
          </Tooltip>
        }
      >
        <div className=" container general_Top">
          <div className="open_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.31 28.83">
              <path
                className="plus_sign"
                d="M20.74,20.83V9.59H27.2V20.83h11v6.28h-11v11.3H20.74V27.11H9.85V20.83h10.9Z"
                transform="translate(-9.85 -9.59)"
              />
            </svg>
          </div>
        </div>
      </OverlayTrigger>

      <div className="cards ">
        {userAdded.map((collaborators) => {
          return (
            <div
              className="containerUser container general_Top"
              key={collaborators.id}
            >
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
                    <h3>Hello there!</h3>

                    <p>
                      {collaborators.name} {collaborators.lastName}.
                    </p>

                    <div>
                      <IconPersonCard />
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
