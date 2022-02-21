import * as React from 'react';
import './commentComponent.scss';
import {
  removeComment, removePostComment, likeComment,
  unlikeComment, getCommentLikes,
} from '../../../../service/commentsApi';
import Spinner from '../../../../components/Spinner/Spinner';
import EditComment from './EditComment';
import LikesModalComponent from '../likes/LikesModal';
import calculateTimePassed from '../../../../utils/postUtils';
import CommentControl from './CommentControl';
import RepliesContainer from '../replies/RepliesContainer';
import { CommentData } from '../../../../utils/typescriptUtils';

interface Props {
  commentData: CommentData,
  updateComments: () => void,
  liked: boolean,
  postId: string,
  postUser: string,
  currentUser: string
}

const CommentComponent: React.FC<Props> = ({
  commentData, updateComments, liked, postId,
  currentUser, postUser,
}) => {
  const [loadingAction, setLoadingAction] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [originalText, setOriginalText] = React.useState(commentData.text);
  const [commentLikes, setCommentLikes] = React.useState({
    nrOfLikes: commentData.nrOfLikes === undefined ? 0 : commentData.nrOfLikes,
    liked,
  });
  const [likesModal, setLikesModal] = React.useState(false);
  const [replyModal, setReplyModal] = React.useState(false);

  const editCommentHandler = () => {
    setEditMode(!editMode);
  };

  const getEditedText = (value: string) => {
    setOriginalText(value);
  };

  const deleteComm = async () => {
    setLoadingAction(true);
    await removeComment(commentData._id);
    setLoadingAction(false);
    updateComments();
  };

  const deletePostComment = async () => {
    setLoadingAction(true);
    await removePostComment({ commentId: commentData._id, postId });
    setLoadingAction(false);
    updateComments();
  };

  const handleLiking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentLikes.liked) {
      unlikeComment(commentData._id);
      setCommentLikes({
        nrOfLikes: commentLikes.nrOfLikes - 1,
        liked: false,
      });
    } else {
      likeComment(commentData._id);
      setCommentLikes({
        nrOfLikes: commentLikes.nrOfLikes + 1,
        liked: true,
      });
    }
  };

  const changeLikesModal = () => {
    if (!likesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    setLikesModal(!likesModal);
  };

  const handleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={commentData.userData.profileImage} alt="profilePic" />
        <p>{commentData.userData.username}</p>
      </div>
      <div className="comment-passed-time">
        <p>{calculateTimePassed(commentData.createdDate)}</p>
      </div>
      <div className="comment-content">
        {editMode
          ? (
            <EditComment
              text={originalText}
              commentId={commentData._id}
              setEditMode={setEditMode}
              getEditedText={getEditedText}
              setLoadingAction={setLoadingAction}
            />
          ) : <p>{originalText}</p>}
      </div>
      <div className="comment-bottom">
        <button type="button" className={commentLikes.liked ? 'liked-comment button-like' : 'button-like'} onClick={handleLiking}>
          {commentLikes.liked
            ? <img src="https://img.icons8.com/ios-filled/50/3498DB/facebook-like.png" alt="like" />
            : <img src="https://img.icons8.com/ios-filled/50/666666/facebook-like--v1.png" alt="likeIcon" />}
          <p>Like</p>
        </button>
        <button type="button" onClick={handleReplyModal}>Reply</button>
        {commentData.userData.username === currentUser && (
          <div className="comment-alter">
            <button type="button" onClick={editCommentHandler}>Edit</button>
            <button type="button" onClick={deleteComm}>Delete</button>
          </div>
        )}
        {loadingAction && <Spinner />}
        <button className="display-likes" type="button" onClick={commentLikes.nrOfLikes > 0 ? changeLikesModal : () => { }}>
          {commentLikes.nrOfLikes}
          {' '}
          <img src="https://img.icons8.com/ios-filled/50/666666/facebook-like.png" alt="like" />
        </button>
      </div>
      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModalComponent
            title="Comment"
            likes={commentLikes.nrOfLikes}
            postId={commentData._id}
            closeHandler={changeLikesModal}
            getLikes={getCommentLikes}
          />
        </>
      )}
      {currentUser === postUser && (
        <CommentControl deletePostComment={deletePostComment} />
      )}
      {replyModal && (
        <RepliesContainer
          commentId={commentData._id}
          currentUser={currentUser}
          postUser={postUser}
        />
      )}
    </div>
  );
};

export default CommentComponent;
