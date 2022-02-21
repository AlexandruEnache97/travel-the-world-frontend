import React, { useState, useEffect } from 'react';

import PostsMenu from './PostsMenu';
import ListPosts from './ListPost';
import './postsContainer.scss';
import { currentSavedPosts } from '../../../../service/savePostsApi';
import { CurrentUser, Post } from '../../../../utils/typescriptUtils';

interface Props {
  getPosts: (page: number) => void,
  createPost: () => void,
  getLikedPosts: (page: number) => void,
  createAlert: (message: string, timeout: number) => void,
  currentUser: CurrentUser,
  posts: {
    currentPosts: Post[],
    likedPosts: string[],
    singlePost: Post,
    totalResults: number
  }
}

const PostsContainer: React.FC<Props> = ({
  currentUser, posts, getPosts,
  createPost, getLikedPosts, createAlert,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSaved, setCurrentSaved] = useState<{postsId: string[], page: number}>({
    postsId: [],
    page: 0,
  });

  useEffect(() => {
    getPosts(currentPage);
    getLikedPosts(currentPage);
  }, []);

  useEffect(() => {
    const getPostsData = async () => {
      const postsSaved: string[] = [];
      posts.currentPosts.slice((currentPage - 1) * 10, currentPage * 10 + 10).map((post) => {
        postsSaved.push(post._id);
      });
      if ((currentSaved.page !== currentPage)
        && postsSaved.length !== 0) {
        const { data } = await currentSavedPosts({ currentPosts: postsSaved });
        setCurrentSaved({
          postsId: [...currentSaved.postsId, ...data.savedPosts],
          page: currentSaved.page + 1,
        });
      }
    }
    getPostsData()
  }, [posts]);

  const getMorePosts = () => {
    getPosts(currentPage + 1);
    getLikedPosts(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="feed-container">
      <PostsMenu
        currentUser={currentUser}
        createPost={createPost}
        createAlert={createAlert}
      />
      <ListPosts
        posts={posts.currentPosts}
        likedPosts={posts.likedPosts}
        hasMore={posts.totalResults > currentPage * 10}
        getMorePosts={getMorePosts}
        createAlert={createAlert}
        savedPosts={currentSaved.postsId}
      />
    </div>
  );
};

export default PostsContainer;
