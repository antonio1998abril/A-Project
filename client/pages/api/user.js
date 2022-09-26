import { useEffect, useState } from "react";
import axios from "axios";
import { loginService } from "../../service/loginService";
import { adminService } from "../../service/adminService";

function User(token) {
  const { getInfoUser } = loginService();
  const { getAllUser } = adminService();

  const [infoUser, setInfoUser] = useState([]);
  const [callback, setCallback] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [alert, setAlert] = useState({});

  /* Search */

  const [role, setRole] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsDashBoard, setItemsDashBoard] = useState([]);

  const [userId, setUserId] = useState("");
  /* Serch functionality */

  useEffect(() => {
    if (token) {
      const getRole = async () => {
        try {
          const res = await axios.get("/api/role", {
            headers: { Authorization: token },
          });
          (res.data.role === "Manager" && setIsManager(true)) ||
            (res.data.role === "Admin" && setIsAdmin(true)) ||
            (res.data.role === "Collaborator" && setIsCollaborator(true));

     
      
          setUserId(res.data?._id);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };

      const getUser = async () => {
        try {
          const res = await axios.get(
            `/api/getAllUser?limit=${
              page * 10
            }&${role}&${sort}&email=${search}`,
            {
              headers: { Authorization: token },
            }
          );
          setItemsDashBoard(res.data.users);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };

      getRole();
      getUser();
    }
  }, [token, role, sort, search, page, callback]);

  return {
    alert: [alert, setAlert],
    infoUser: [infoUser, setInfoUser],
    isManager: [isManager, setIsManager],
    isCollaborator: [isCollaborator, setIsCollaborator],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    role: [role, setRole],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    itemsDashBoard: [itemsDashBoard, setItemsDashBoard],
    userId: [userId],
  };
}
export default User;
