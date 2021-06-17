import {
  post,
  put,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const savePost = async (postId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/savePost`, { postId });
  return data;
};

export const deleteSavedPost = async (postId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/deleteSavedPost`, { postId });
  return data;
};

export const currentSavedPosts = async (currentPosts) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/currentSavedPosts`, currentPosts);
  return data;
};

export const userSavedPosts = async (pageNumber) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/savedPosts/${pageNumber}`);
  return data;
};
