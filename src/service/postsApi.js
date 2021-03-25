import {
  get,
  post,
  put,
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

export const getAllPosts = async (pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/allPosts/${pageNumber}`);
  return data;
};

export const getPostsLiked = async (pageNumber) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedPosts/${pageNumber}`);
  return data;
};

export const likePost = async (likeData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likePost`, likeData);
  return data;
};

export const unlikePost = async (likeData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikePost`, likeData);
  return data;
};
