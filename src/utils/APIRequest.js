import axios from "axios";
import { errorToast, successToast } from "./Toast";

//create an instance of Axios
const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

const RegisterUser = async (user) => {
  try {
    const { data } = await AxiosInstance.post("/auth/register", user);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return false;
  }
};
const UpdateUser = async (formData) => {
  try {
    const { data } = await AxiosInstance.put("/auth/update-user", formData);
    const { success, message, user } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return user;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const loggedInUser = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/auth/login", formData);
    const { success, message, token } = data;
    if (success) {
      localStorage.setItem("access_token", token);
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return false;
  }
};

const logoutUser = async (formData) => {
  try {
    const { data } = await AxiosInstance.get("/auth/logout");
    const { success, message } = data;
    if (success) {
      localStorage.removeItem("access_token");
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return false;
  }
};

const getUser = async () => {
  try {
    const { data } = await AxiosInstance.get("/auth/user");
    const { user } = data;
    return user;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const createPost = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/post/create", formData);
    const { success, message, post } = data;
    if (success) {
      successToast(message);
    }
    return post;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error");
    }
    return null;
  }
};

const fetchAllPosts = async () => {
  try {
    const { data } = await AxiosInstance.get("/post");
    const { posts } = data;
    return posts;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error");
    }
    return null;
  }
};

const uploadMedia = async (file) => {
  try {
    //if there is no file choosen
    if (!file) {
      return;
    }
    //if file is choose
    //create a form data object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Social_Media");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dycobmjyk/image/upload",
      formData,
      {
        reportProgress: true,
      }
    );
    return data.url;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.error.message);
    } else {
      errorToast(err.message ?? "Network Error");
    }
    return null;
  }
};

const likePost = async (postId) => {
  try {
    const { data } = await AxiosInstance.put("/post/like/" + postId);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return data;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const deletePost = async (postId) => {
  try {
    const { data } = await AxiosInstance.delete("/post/delete/" + postId);
    const { message, success } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return false;
  }
};

const commentPost = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/post/comment", formData);
    const { message, success } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return false;
  }
};

const getPostComments = async (postId) => {
  try {
    const { data } = await AxiosInstance.get("/post/comments/" + postId);
    const { comments } = data;
    return comments;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const likeComment = async (commentId) => {
  try {
    const { data } = await AxiosInstance.put("/comment/like/" + commentId);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return data;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const repliedComment = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/comment/add-reply", formData);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return data;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const getCommentReplies = async (commentId) => {
  try {
    const { data } = await AxiosInstance.get("/comment/replies/" + commentId);
    const { replies } = data;
    return replies;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const getFriendSuggestList = async () => {
  try {
    const { data } = await AxiosInstance.get("/friend/suggested");
    const { suggestedFriends } = data;
    return suggestedFriends;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data?.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return null;
  }
};

const sendFriendRequest = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/friend/request-send", formData);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data?.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return false;
  }
};

const getFriendRequestList = async () => {
  try {
    const { data } = await AxiosInstance.get("/friend/request");
    const { requests } = data;
    return requests;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data?.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return null;
  }
};

const cancelRequest = async (id) => {
  try {
    const { data } = await AxiosInstance.put("/friend/cancel-request/" + id);
    const { requests, message, success } = data;
    if (success) {
      successToast(message);
    }
    return requests;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data?.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return null;
  }
};

const acceptRequest = async (requestId, requestStatus) => {
  try {
    const { data } = await AxiosInstance.put(
      "/friend/request-accept/" + requestId + "/" + requestStatus
    );
    const { message, success } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data?.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return false;
  }
};

const sendPasswordResetOTP = async (email) => {
  try {
    const { data } = await AxiosInstance.get("/auth/forgot-password/" + email);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return false;
  }
};

const resetPassword = async (formData) => {
  try {
    const { data } = await AxiosInstance.put("/auth/reset-password", formData);
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return success;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Network error!");
    }
    return false;
  }
};

const profileDetails = async (profileId) => {
  try {
    const { data } = await AxiosInstance.get("/auth/profile/" + profileId);
    const { message, success, userDetails } = data;
    if (!success) {
      errorToast(message);
    }
    return userDetails;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Network error");
    }
    return null;
  }
};

const likeCommentReply = async (replyId) => {
  try {
    const { data } = await AxiosInstance.put(
      "/comment/replies/like/" + replyId
    );
    const { success, message } = data;
    if (success) {
      successToast(message);
    } else {
      errorToast(message);
    }
    return data;
  } catch (error) {
    if (error.response) {
      errorToast(error.response?.data?.message);
    } else {
      errorToast(error.message ?? "Server Error!");
    }
    return null;
  }
};

const getPostDetails = async (postId) => {
  try {
    const { data } = await AxiosInstance.get("/post/details/" + postId);
    const { post } = data;
    return post;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const getUserPost = async (userId) => {
  try {
    const { data } = await AxiosInstance.get("/post/" + userId);
    const { posts } = data;
    return posts;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const getRequestList = async () => {
  try {
    const { data } = await AxiosInstance.get("/friend/requests");
    const { requests } = data;
    return requests;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const sendMessage = async (formData) => {
  try {
    const { data } = await AxiosInstance.post("/chat/message", formData);
    const { message, success, newMessage } = data;
    if (!success) {
      errorToast(message);
    }
    return newMessage;
  } catch (err) {
    if (err.response) {
      errorToast(err.response.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const getAllMessages = async (id) => {
  try {
    const { data } = await AxiosInstance.get("/chat/message/" + id);
    const { messages } = data;
    return messages;
  } catch (err) {
    if (err.response) {
      return [];
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const getAllChats = async (id) => {
  try {
    const { data } = await AxiosInstance.get("/chat");
    const { chats } = data;
    return chats;
  } catch (err) {
    if (err.response) {
      return [];
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const blockUser = async (formData) => {
  try {
    const { data } = await AxiosInstance.put("/chat/block", formData);
    const { success, message, chat } = data;
    if (success) {
      successToast(message);
    }
    return chat;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const deleteChats = async (memberId) => {
  try {
    const { data } = await AxiosInstance.put("/chat/delete/" + memberId);
    const { success, message, chats } = data;
    if (success) {
      successToast(message);
    }
    return chats;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const unfriendUser = async (id) => {
  try {
    const { data } = await AxiosInstance.put("/friend/unfriend/" + id);
    const { success, message, user } = data;
    if (success) {
      successToast(message);
    }
    return user;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

const searchUser = async (keyword) => {
  try {
    const { data } = await AxiosInstance.get("/auth/search-user/" + keyword);
    const { users } = data;
    return users;
  } catch (err) {
    if (err.response) {
      errorToast(err.response?.data.message);
    } else {
      errorToast(err.message ?? "Server Error!");
    }
    return null;
  }
};

export {
  RegisterUser,
  loggedInUser,
  logoutUser,
  getUser,
  createPost,
  fetchAllPosts,
  uploadMedia,
  likePost,
  deletePost,
  commentPost,
  getPostComments,
  likeComment,
  repliedComment,
  getCommentReplies,
  getFriendSuggestList,
  sendFriendRequest,
  getFriendRequestList,
  acceptRequest,
  UpdateUser,
  sendPasswordResetOTP,
  resetPassword,
  profileDetails,
  likeCommentReply,
  getPostDetails,
  getUserPost,
  getRequestList,
  sendMessage,
  getAllMessages,
  getAllChats,
  blockUser,
  deleteChats,
  unfriendUser,
  cancelRequest,
  searchUser,
};

//{withCredentials:true} it ensures that user is authorised
