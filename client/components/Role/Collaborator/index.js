import React, { useEffect, useState } from "react";
import roleAccess from "./roleAccess";
import Link from "next/link";

const activities = [
  {
    id: "1A",
    importanceLevel: "high",
    subject: "User image",
    dateToComplete: "09/02/2022",
    description: "update perfil",
    observable: "public",
  },
  {
    id: "2A",
    importanceLevel: "low",
    subject: "Migration test 2",
    dateToComplete: "08/01/2022",
    description: "pages are not working",
    observable: "public",
  },
  {
    id: "3A",
    importanceLevel: "low",
    subject: "Activity A3",
    dateToComplete: "09/22/2022",
    description: "Server down",
    observable: "public",
  },
  {
    id: "4A",
    importanceLevel: "low",
    subject: "Certification React",
    dateToComplete: "11/28/2022",
    description: "React certification",
    observable: "public",
  },
  {
    id: "5A",
    importanceLevel: "high",
    subject: "Migration test",
    dateToComplete: "08/01/2022",
    description: "pages are not working",
    observable: "private",
  },
  {
    id: "6A",
    importanceLevel: "medium",
    subject: "Activity not completed 7P",
    dateToComplete: "08/01/2022",
    description: "pages are not working",
    observable: "public",
  },
  {
    id: "7A",
    importanceLevel: "low",
    subject: "Migration test",
    dateToComplete: "08/01/2022",
    description: "pages are not working",
    observable: "private",
  },
  {
    id: "8A",
    importanceLevel: "low",
    subject: "Activity 4B test",
    dateToComplete: "08/01/2022",
    description: "pages are not working",
    observable: "public",
  },
];

function Collaborator() {
  const [activitiesUser, setActivities] = useState(activities);

  useEffect(() => {
    setActivities((prev) =>
      prev.filter((fruit) => fruit.observable === "public")
    );
  }, []);

  return (
    <>
      <div className="dahsBoardActivity">
        {activitiesUser.map((act) => {
          return (
            <div className="co-register100" key={act.id}>
              <div
                className={`card ${
                  act.importanceLevel === "low"
                    ? "bg-primary text-white"
                    : act.importanceLevel === "medium"
                    ? "bg-warning text-dark"
                    : act.importanceLevel === "high"
                    ? "bg-danger text-white"
                    : "bg-dark text-white"
                }`}
              >
                <h5 className="card-header">Priority: {act.importanceLevel}</h5>
                <div className="card-body">
                  <h5 className="card-title">{act.subject}</h5>
                  <p className="card-text">{act.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <button type="button" className="btn btn-light btn-sm">
                    See more
                  </button>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default roleAccess(Collaborator);
