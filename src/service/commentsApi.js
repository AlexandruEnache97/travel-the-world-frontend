import {
  get,
  //   post,
  put,
//   remove,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const likeComment = async (commentId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likeComment`, commentId);
  return data;
};

export const unlikeComment = async (commentId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikeComment`, commentId);
  return data;
};

export const getComments = async (postId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/getComments/${postId}/${pageNumber}`);
  return data;
};

export const getLikedComments = async (postId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedComments/${postId}/${pageNumber}`);
  return data;
};
