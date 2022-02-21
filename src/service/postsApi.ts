import {
  get,
  post,
  put,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

interface PostData {
  postId: string
}

interface LikesData {
  likes: number
}

export const makePost = async (postData: PostData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/post`, postData);
  return data;
};

export const getSinglePost = async (postId: string) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/post/${postId}`);
  return data;
};

export const getAllPosts = async (pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/allPosts/${pageNumber}`);
  return data;
};

export const getPostsLiked = async (pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedPosts/${pageNumber}`);
  return data;
};

export const likePost = async (likeData: LikesData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likePost`, likeData);
  return data;
};

export const unlikePost = async (likeData: LikesData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikePost`, likeData);
  return data;
};

export const getUserLikes = async (postId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/userLikes/${postId}/${pageNumber}`);
  return data;
};

export const getUserPosts = async (userAccountId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/userPosts/${userAccountId}/${pageNumber}`);
  return data;
};

export const getUserLikedPosts = async (userAccountId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/userLikedPosts/${userAccountId}/${pageNumber}`);
  return data;
};
