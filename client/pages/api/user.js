import  { useEffect, useState } from 'react';
import axios from 'axios';
/* import swal from 'sweetalert2'; */

function User(token) {

    const [isLogged,setIsLogged] = useState(false);
    const [infoUser,setInfoUser] = useState([]);
    const [callback,setCallback] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [tokenAuth,setTokenAuth] = useState('');

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setTokenAuth(tokenAuth)
                    setIsLogged(true)
                    setInfoUser(res.data)
                    res.data.role == 'Admin' ? setIsAdmin(true) :setIsAdmin(false)
                   
                   
                } catch (err) {
                    /* swal({
                        title:"ERROR",
                        text:err.response.data.msg,
                        icon:"error",
                        button:"OK"
                    }) */
                    localStorage.removeItem('firstLogin')
                }
            }
            getUser()
        }
    },[token]);

 return {
        isLogged:[isLogged,setIsLogged],
        infoUser:[infoUser,setInfoUser],
        isAdmin:[isAdmin,setIsAdmin],
        callback:[callback,setCallback],
        token:tokenAuth
    }
}
export default User