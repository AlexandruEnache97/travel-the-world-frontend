import {
  get,
  post,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const makePost = async (postData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/post`, postData);
  return data;
};

export const getSinglePost = async (postId) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/post/${postId}`);
  return data;
};
