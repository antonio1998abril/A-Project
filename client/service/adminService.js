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
  const uploadFile = (formData) => {
    const url = `/api/upload`;
    return post(url, formData,"uploadFile", {});
  };

  const deleteFile = (body) => {
    const url = `/api/destroy/`;
    return post(url,body,"deleteFile", {});
  };
  /* Collaborator */
  const getCollaboratorInfo = (id) => {
    const url = `/api/getCollaboratorInfo/${id}`;
    return get(url,"CollaboratorInfo", {});
  };
  /* Kanban Board */
  const postTask =(body) => {
    const url =`/api/newTask`;
    return post(url,body,"newTask", {});
  };
  const getTasks = (id) => {
    const url = `/api/getTask/${id}`;
    return get(url,"TaskList", {});
  };
  const updateTask = (id,body) => {
    const url = `/api/updateTask/${id}`;
    return put(url,body,"TaskList", {});
  };
  const deleteTask = (id) => {
    const url = `/api/deleteTask/${id}`;
    return deleteFn(url,"deleteTask", {});
  };

  return {
    registerNewUser,
    deleteUser,
    updateUser,
    uploadFile,
    deleteFile,
    getCollaboratorInfo,
    postTask,
    getTasks,
    updateTask,
    deleteTask
  };
};
