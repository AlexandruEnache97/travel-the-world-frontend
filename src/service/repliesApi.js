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

export const createReply = async (replyData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/createReply`, replyData);
  return data;
};
