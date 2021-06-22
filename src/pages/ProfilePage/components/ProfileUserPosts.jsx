import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListPosts from '../../Dashboard/components/posts/ListPost';
import { getUserPosts, getUserLikedPosts } from '../../../service/postsApi';
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay';
import { currentSavedPosts } from '../../../service/savePostsApi';

const ProfileUserPosts = ({ createAlert, userAccountId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profilePosts, setProfilePosts] = useState({
    userPosts: [],
    totalResults: 0,
    likedUserPosts: [],
  });
  const [currentSaved, setCurrentSaved] = useState({
    postsId: [],
    page: 0,
  });
  const [loading, setLoading] = useState(null);

  const loadSavedPosts = async (posts) => {
    const postsSaved = [];
    posts.slice((currentPage - 1) * 10, currentPage * 10 + 10).map((post) => {
      postsSaved.push(post._id);
    });
    const response = await currentSavedPosts({ currentPosts: postsSaved });
    setCurrentSaved({
      postsId: [...currentSaved.postsId, ...response.data.savedPosts],
      page: currentSaved.page + 1,
    });
  };

  useEffect(async () => {
    setLoading('loading');
    await getUserPosts(userAccountId, currentPage)
      .then(async (res) => {
        const { data } = res;
        const likedPosts = await getUserLikedPosts(userAccountId, currentPage);
        setProfilePosts({
          userPosts: data.posts,
          totalResults: data.totalResults,
          likedUserPosts: likedPosts.data.likedPosts,
        });
        loadSavedPosts(data.posts);
        setLoading(null);
      })
      .catch(() => {
        setProfilePosts({
          userPosts: [],
          totalResults: 0,
          likedUserPosts: [],
        });
        setLoading(null);
      });
  }, []);

  const getMorePosts = async () => {
    setLoading('loading');
    const { data } = await getUserPosts(userAccountId, currentPage + 1);
    const likedPosts = await getUserLikedPosts(userAccountId, currentPage + 1);
    setCurrentPage(currentPage + 1);
    setProfilePosts({
      userPosts: [...profilePosts.userPosts, ...data.posts],
      totalResults: data.totalResults,
      likedUserPosts: [...profilePosts.likedUserPosts, ...likedPosts.data.likedPosts],
    });
    loadSavedPosts(data.posts);
    setLoading(null);
  };
  return (
    <div>
      <ListPosts
        posts={profilePosts.userPosts}
        likedPosts={profilePosts.likedUserPosts}
        hasMore={profilePosts.totalResults > currentPage * 10}
        getMorePosts={getMorePosts}
        createAlert={createAlert}
        savedPosts={currentSaved.postsId}
      />
      <LoadingOverlay loading={{ loadingState: [loading] }} />
    </div>
  );
};

ProfileUserPosts.propTypes = {
  createAlert: PropTypes.func.isRequired,
  userAccountId: PropTypes.string.isRequired,
};

export default ProfileUserPosts;
