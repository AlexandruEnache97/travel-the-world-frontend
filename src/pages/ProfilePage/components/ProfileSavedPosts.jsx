/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userSavedPosts } from '../../../service/savePostsApi';
import ListPosts from '../../Dashboard/components/posts/ListPost';
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay';

const ProfileSavedPosts = ({ createAlert }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(null);
  const [savedPosts, setSavedPosts] = useState({
    posts: [],
    totalResults: 0,
    likedUserPosts: [],
  });
  const [currentSaved, setCurrentSaved] = useState({
    postsId: [],
    page: 0,
  });

  useEffect(() => {
    console.log(savedPosts);
  }, [savedPosts]);

  useEffect(async () => {
    setLoading('loading');
    await userSavedPosts(currentPage)
      .then(async (res) => {
        const { data } = res;
        setSavedPosts({
          posts: data.savedPosts,
          totalResults: data.totalResults,
          likedUserPosts: [],
        });
        setCurrentSaved({
          postsId: [...currentSaved.postsId, ...data.savedPosts.map((post) => (post._id))],
          page: currentSaved.page + 1,
        });
        setLoading(null);
      })
      .catch(() => {
        setSavedPosts({
          posts: [],
          totalResults: 0,
          likedUserPosts: [],
        });
        setLoading(null);
      });
  }, []);

  return (
    <div>
      <ListPosts
        posts={savedPosts.posts}
        likedPosts={[]}
        hasMore={savedPosts.totalResults > currentPage * 10}
        getMorePosts={() => { }}
        createAlert={createAlert}
        savedPosts={currentSaved.postsId}
      />
      <LoadingOverlay loading={{ loadingState: [loading] }} />
    </div>
  );
};

ProfileSavedPosts.propTypes = {
  createAlert: PropTypes.func.isRequired,
};

export default ProfileSavedPosts;
