import { HttpService } from "./HttpService";

export const adminService = () => {
  const { post, get, deleteFn, put } = HttpService();

  const registerNewUser = (body) => {
    const url = `/api/registerNewUser`;
    return post(url, body,"registerNewUser", {});
  };

/*   const getAllUser = ({page,role,sort,search}) => {
    const url = `/api/getAllUser?limit=${page*6}&${role}&${sort}&title[regex]=${search}`;
    return get(url, "getUser", {});
  };
 */
  const deleteUser = (id) => {
    const url = `/api/deleteUserAccount/${id}`;
    return deleteFn(url, "deleteUser", {});
  };

  const updateUser = (id,body) => {
    const url = `/api/updateAccount/${id}`;
    return put(url, body,"updateAccount", {});
  };


  return {
    registerNewUser,
    deleteUser,
    updateUser
  };
};
