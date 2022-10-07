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

  

  return {
    getDailyComment,
    postDailyComment,
  };
};
