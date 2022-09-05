import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

export const status = {
  [uuid()]: {
    name: "To do",
    color: "#FFFAE6",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "In Progress",
    color: "#EAE6FF",
    items: []
  },
  [uuid()]: {
    name: "Review",
    color: "#DEEBFF",
    items: []
  },
  [uuid()]: {
    name: "Completed",
    color: "#E3FCEF",
    items: []
  }
};