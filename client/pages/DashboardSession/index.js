import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import withAuth from "../HOC/withAuth.jsx";
import Link from "next/link";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import IconPersonCard from "../../components/Icons/IconPersonCard";
import PersonIcon from "../../components/Icons/PersonIcon";
import { loginService } from "../../service/loginService";
import { useEffect } from "react";

function Index(verified) {
  const state = useContext(AuthContext);
  const [isManager] = state.User.isManager;
  const [isCollaborator] = state.User.isCollaborator;

  const { getInfoUser } = loginService();

  console.log("Manager", isManager);
  console.log("Collaborator", isCollaborator);

  const getInfo = async () => {
    const res = await getInfoUser();
    console.log("DashBoard Session, userInfo", res);
  };

  useEffect(() => {
    getInfo();
  }, []);

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
      <div className="content-wrap">
        <div className="cardSearch container general_Top">
          <div className="card-body">
            <div className="input-group">
              <input
                size="100"
                type="text"
                className="form-control"
                placeholder="Find an user"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>

        <OverlayTrigger
          overlay={
            <Tooltip>
              Create a <strong>new collaborator</strong>.
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

        <div className="co-register100">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </p>
            </div>
          </div>
        </div>

        <div className="content-wrap">
          <div className="gridIndex">
            <Link href="/test">
              <div className="card ">
                <div className="titleIndex">
                  <b>dsds</b>
                </div>
              </div>
            </Link>
            <Link href="/test">
              <div className="card  ">
                <div className="titleIndex">
                  <b>sda.</b>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Index);
