import { useEffect, useState } from "react";
import axios from "axios";
import { loginService } from "../../service/loginService";

function User(token) {
  const { getInfoUser } = loginService();

  const [infoUser, setInfoUser] = useState([]);
  const [callback, setCallback] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/api/info", {
            headers: { Authorization: token },
          });

          setInfoUser(res.data);
          res.data.role == "Admin" ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };
      getUser();
    }
  }, [token]);

  return {
    infoUser: [infoUser, setInfoUser],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
  };
}
export default User;
