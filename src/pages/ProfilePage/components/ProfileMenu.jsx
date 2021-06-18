import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './profileMenu.scss';
import CreatePost from '../../Dashboard/components/posts/CreatePost';

const ProfileMenu = ({
  title, createPost, currentUser, createAlert, showSavedPosts,
}) => {
  const [createPostModal, setCreatePostModal] = useState(false);

  const changeCreatePost = () => {
    setCreatePostModal(!createPostModal);
  };

  const savedPostsHandler = () => {
    showSavedPosts('Your posts');
  };

  return (
    <div className="profile-menu" id="profileRef">
      <button
        id="profileRef"
        className="active-button"
        type="button"
      >
        {title}
      </button>
      {title === 'Saved posts' && (
        <button type="button" className="back-button" onClick={savedPostsHandler}>
          <img src="https://img.icons8.com/ios-glyphs/90/000000/circled-left-2.png" alt="backIcon" />
        </button>
      )}
      <button className="create-post-button" type="button" onClick={changeCreatePost}>Create new post</button>
      {
        createPostModal && (
          <>
            <div className="modal" onClickCapture={changeCreatePost} />
            <div className="create-post-modal">
              <CreatePost
                createPost={createPost}
                username={currentUser.username}
                profileImage={currentUser.profileImage}
                createAlert={createAlert}
              />
            </div>
          </>
        )
      }
    </div>
  );
};

ProfileMenu.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  createPost: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showSavedPosts: PropTypes.func.isRequired,
};

export default ProfileMenu;
