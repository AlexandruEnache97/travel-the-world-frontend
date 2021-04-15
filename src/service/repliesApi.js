import {
  get,
  //   post,
  put,
//   remove,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const getReplies = async (commentId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/getReplies/${commentId}/${pageNumber}`);
  return data;
};

export const getReplyLikes = async (replyId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/replyLikes/${replyId}/${pageNumber}`);
  return data;
};

export const getLikedReplies = async (commentId, pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedReplies/${commentId}/${pageNumber}`);
  return data;
};

export const likeReply = async (replyId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likeReply`, replyId);
  return data;
};

export const unlikeReply = async (replyId) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikeReply`, replyId);
  return data;
};

export const createReply = async (replyData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/createReply`, replyData);
  return data;
};
