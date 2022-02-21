import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  profileImage: string,
  username: string,
  userId: string
}

const LikeComponent: React.FC<Props> = ({ profileImage, username, userId }) => (
  <Link
    className="like-container"
    to={{
      pathname: `/user/${username}`,
      state: {
        userId,
        username,
        profileImage,
      },
    }}
  >
    <img src={profileImage} alt="profileImage" />
    <p>{username}</p>
  </Link>
);

export default LikeComponent;
