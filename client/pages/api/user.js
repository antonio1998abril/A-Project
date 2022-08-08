import { useEffect, useState } from "react";
import axios from "axios";
import { loginService } from "../../service/loginService";

function User(token) {
  const { getInfoUser } = loginService();

  const [infoUser, setInfoUser] = useState([]);
  const [callback, setCallback] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [alert,setAlert] = useState({})

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
           const res = await axios.get("/api/role", {
            headers: { Authorization: token },
          });
          res.role === 'Manager' && setIsManager(true) || res.role !== 'Manager' && setIsCollaborator(true); 
          
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };
      getUser();
    }
  }, [token]);

  
  return {
    alert: [alert,setAlert],
    infoUser: [infoUser, setInfoUser],
    isManager: [isManager, setIsManager],
    isCollaborator: [isCollaborator,setIsCollaborator],
    callback: [callback, setCallback],
  };
}
export default User;
