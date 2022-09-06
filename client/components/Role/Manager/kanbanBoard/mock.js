
import { v4 as uuid } from "uuid";
/* import { adminService } from "../../../../service/adminService"; */

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

export const status = (id) => {
/*   const { getTasks } = adminService();
 */
/*   const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [completed, setCompleted] = useState([]); */

  const getTaskBySection = async (id) => {
/*     const res = await getTasks(id);
    console.log("list", res); */
  };
/*   useEffect(() => {
    getTaskBySection(id);
  }, []); */

  return {
    [uuid()]: {
      name: "To do",
      color: "#FFFAE6",
      items: itemsFromBackend,
    },
    [uuid()]: {
      name: "In Progress",
      color: "#EAE6FF",
      items: [],
    },
    [uuid()]: {
      name: "Review",
      color: "#DEEBFF",
      items: [],
    },
    [uuid()]: {
      name: "Completed",
      color: "#E3FCEF",
      items: [],
    },
  };
};
