import {
  get,
  put,
  remove,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

interface CommentData {
  text: string,
  postId: string
}

export const getComments = async (postId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/getComments/${postId}/${pageNumber}`);
  return data;
};

export const getCommentLikes = async (postId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/commentLikes/${postId}/${pageNumber}`);
  return data;
};

export const getLikedComments = async (postId: string, pageNumber: number) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/likedComments/${postId}/${pageNumber}`);
  return data;
};

export const likeComment = async (commentId: string) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/likeComment`, commentId);
  return data;
};

export const unlikeComment = async (commentId: string) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/unlikeComment`, commentId);
  return data;
};

export const createComment = async (commentData: CommentData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/createComment`, commentData);
  return data;
};

export const editComment = async (commentData: {text: string, commentId: string}) => {
  const data = await put(`${NODE_SERVER.baseUrl}/api/editComment`, commentData);
  return data;
};

export const removeComment = async (commentId: string) => {
  const data = await remove(`${NODE_SERVER.baseUrl}/api/deleteComment`, commentId);
  return data;
};

export const removePostComment = async (commentData: {postId: string, commentId: string}) => {
  const data = await remove(`${NODE_SERVER.baseUrl}/api/deleteCommentPost`, commentData);
  return data;
};
