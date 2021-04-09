import {
  get,
  //   post,
  put,
  remove,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getComments = async (postId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/getComments/${postId}/${pageNumber}`);
  return data;
};

export const getCommentLikes = async (postId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/commentLikes/${postId}/${pageNumber}`);
  return data;
};

export const getLikedComments = async (postId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedComments/${postId}/${pageNumber}`);
  return data;
};

export const likeComment = async (commentId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likeComment`, commentId);
  return data;
};

export const unlikeComment = async (commentId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikeComment`, commentId);
  return data;
};

export const createComment = async (commentData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/createComment`, commentData);
  return data;
};

export const editComment = async (commentData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/editComment`, commentData);
  return data;
};

export const removeComment = async (commentId) => {
  const data = await remove(`${NODE_SERVER.baseUrl}/api/deleteComment`, commentId);
  return data;
};
