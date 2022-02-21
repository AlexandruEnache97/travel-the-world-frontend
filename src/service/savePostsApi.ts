import { get, post, put } from "./axiosOperations";
import { NODE_SERVER } from "../../config";

interface CurrentPosts {
  postId: string
}

export const savePost = async (postId: string) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/savePost`, { postId });
  return data;
};

export const deleteSavedPost = async (postId: string) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/deleteSavedPost`, {
    postId,
  });
  return data;
};

export const currentSavedPosts = async (currentPosts: {currentPosts: string[]}) => {
  const data = await post(
    `${NODE_SERVER.baseUrl}/api/currentSavedPosts`,
    currentPosts
  );
  return data;
};

export const userSavedPosts = async (pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/savedPosts/${pageNumber}`);
  return data;
};

export const likedSavedPosts = async (pageNumber: number) => {
  const data = await get(
    `${NODE_SERVER.baseUrl}/api/likedSavedPosts/${pageNumber}`
  );
  return data;
};
