import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Dashboard/components/Navbar';
import './profilePage.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import ListPosts from '../Dashboard/components/posts/ListPosts';
// import CreatePost from '../Dashboard/components/posts/CreatePost';
import { getUserPosts, getUserLikedPosts } from '../../service/postsApi';
// import MenuContainer from '../Dashboard/components/menu/MenuContainer';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import ScrollButton from '../../components/Buttons/ScrollButton';
import ProfileInfo from './components/ProfileInfo';
import ProfileMenu from './components/ProfileMenu';
// import UserDetails from './UserDetails';

const ProfilePage = ({ auth, /* createPost, */ signOut }) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [likedUserPosts, setLikedUserPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    setLoading('loading');
    const { data } = await getUserPosts(currentPage);
    const likedPosts = await getUserLikedPosts(currentPage);
    setUserPosts(data.posts);
    setTotalResults(data.totalResults);
    setLikedUserPosts(likedPosts.data.likedPosts);
    setLoading(null);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  const getMorePosts = async () => {
    console.log('more posts');
    setLoading('loading');
    const { data } = await getUserPosts(currentPage + 1);
    const likedPosts = await getUserLikedPosts(currentPage + 1);
    setCurrentPage(currentPage + 1);
    setUserPosts([...userPosts, ...data.posts]);
    setTotalResults(data.totalResults);
    setLikedUserPosts([...likedUserPosts, ...likedPosts.data.likedPosts]);
    setLoading(null);
  };

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== '' && currentUser.username !== undefined
        && (
          <div className="profile-page">
            <ProfileInfo currentUser={currentUser} />
            <div className="profile-container">
              <ProfileMenu />
              {/* <CreatePost
                createPost={createPost}
                username={currentUser.username}
                profileImage={currentUser.profileImage}
              /> */}
              <ListPosts
                posts={userPosts}
                likedPosts={likedUserPosts}
                hasMore={totalResults > currentPage * 10}
                getMorePosts={getMorePosts}
              />
              <ScrollButton refId="profileRef" />
            </div>

          </div>
        )}
      <img className="profile-background" src={backgroundGradient} alt="profileGradient" />
      <LoadingOverlay loading={{ loadingState: [loading] }} />
    </>
  );
};

ProfilePage.propTypes = {
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  // createPost: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default ProfilePage;
