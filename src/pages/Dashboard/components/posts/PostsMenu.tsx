import * as React from 'react';
import { CurrentUser, PostData } from '../../../../utils/typescriptUtils';
import CreatePost from './CreatePost';
import './postsMenu.scss';

interface Props {
  currentUser: CurrentUser,
  createPost: (postData: PostData) => void,
  createAlert: (message: string, timeout: number) => void
}

const PostsMenu: React.FC<Props> = ({ createPost, currentUser, createAlert }) => {
  const [createPostModal, setCreatePostModal] = React.useState<boolean>(false);

  const createPostHandler = () => {
    setCreatePostModal(!createPostModal);
  };

  return (
    <div className="posts-menu" id="topRef">
      <button className="active-button" type="button">News feed</button>
      <button className="create-post-button" type="button" onClick={createPostHandler}>Create new post</button>
      {createPostModal && (
        <>
          <div className="modal" onClickCapture={createPostHandler} />
          <div className="create-post-modal">
            <CreatePost
              createPost={createPost}
              username={currentUser.username}
              profileImage={currentUser.profileImage}
              createAlert={createAlert}
              closeModal={createPostHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostsMenu;
