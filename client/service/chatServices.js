import { HttpService } from "./HttpService";

export const chatService = () => {
  const { post, get, put, deleteFn } = HttpService();

  const getDailyComment = (id) => {
    const url = `/api/getDailyComment/${id}`;
    return get(url, "getDailyComment", {});
  };

  const postDailyComment = (id, body) => {
    const url = `/api/postDailyComment/${id}`;
    return post(url, body, "postDailyComment", {});
  };

  const getChats = (id) => {
    const url = `/api/getChatRooms/${id}`;
    return get(url, "getChatRooms", {});
  };


  const postComments = (id,body) => {
    const url = `/api/postComment/${id}`;
    return post(url, body,"postComment", {});
  };
  return {
    getDailyComment,
    postDailyComment,
    postComments,
    getChats
  };
};
