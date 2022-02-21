import * as React from 'react';
import CommentComponent from './CommentComponent';
import Spinner from '../../../../components/Spinner/Spinner';
import { CommentData } from '../../../../utils/typescriptUtils';


interface Props {
  comments: CommentData[],
  currentUser: string,
  postUser: string,
  postId: string,
  totalResults: number,
  getCommentsFromBackend: (page: number, moreResults: boolean) => void,
  updateComments: () => void,
  currentPage: number,
  likedComments: string[]
}

const CommentList: React.FC<Props> = ({
  currentUser, postUser, postId, comments, totalResults,
  getCommentsFromBackend, updateComments, currentPage, likedComments,
}) => {
  const [loadingAction, setLoadingAction] = React.useState(false);

  const getMoreComments = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoadingAction(true);
    const div = document.getElementById(`comment-id-${postId}`);
    if(div) {
      const value = div.scrollHeight - 430;
      await getCommentsFromBackend(currentPage + 1, true);
      div.scrollTop = value;
    }
    setLoadingAction(false);
  };

  return (
    <div className="comments-list-container" id={`comment-id-${postId}`}>
      {totalResults > 0 ? comments.map((comment) => {
        let liked = false;
        likedComments.map((item) => {
          if (comment._id === item) { liked = true; }
        });
        return (
          <CommentComponent
            key={Math.random()}
            commentData={comment}
            updateComments={updateComments}
            liked={liked}
            postId={postId}
            currentUser={currentUser}
            postUser={postUser}
          />
        );
      }) : totalResults === 0
      && (
        <div className="comments-loading">
          <span>Loading</span>
          <div className="loading-spinner-comments">
            <div className="loading-icon" data-testid="spinner" />
          </div>
        </div>
      )}
      <div className="comments-more">
        {totalResults > comments.length
          && (
            <>
              {!loadingAction ? (
                <button type="button" onClick={getMoreComments}>
                  Load
                  {' '}
                  {totalResults - comments.length < 10 ? totalResults - comments.length : 10}
                  {' more comments'}
                </button>
              ) : (
                <div className="load-more-spinner">
                  <p>Loading </p>
                  <Spinner />
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};

export default CommentList;
