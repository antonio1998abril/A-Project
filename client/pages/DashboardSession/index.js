import React, { useContext } from "react";
import { AuthContext } from "../../context";
import withAuth from "../HOC/withAuth.jsx";

import Admin from "../../components/Role/Admin/index";
import Manager from "../../components/Role/Manager/index";
import Collaborator from "../../components/Role/Collaborator/index";

function Index() {
  const state = useContext(AuthContext);
  const [isManager] = state.User.isManager;
  const [isCollaborator] = state.User.isCollaborator;
  const [isAdmin] = state.User.isAdmin;

  return (
    <>
      <div className="content-wrap">
        <div className="cardSearch container">
          <div className="card-body">
            <div className="input-group">
              <input
                size="100"
                type="text"
                className="form-control"
                placeholder={
                  isAdmin
                    ? "Find Managers or Users"
                    : isManager
                    ? "Find Collaborators"
                    : isCollaborator
                    ? "Find your activities"
                    : null
                }
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>

        <Admin />
        <Manager />
        <Collaborator />
      </div>
    </>
  );
}

export default withAuth(Index);
