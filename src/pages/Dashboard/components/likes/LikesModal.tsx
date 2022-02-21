import * as React from 'react';
import './likesModal.scss';
import Spinner from '../../../../components/Spinner/Spinner';
import LikeComponent from './LikeComponent';

type CloseHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
type GetMoreLikes = (event: React.MouseEvent<HTMLButtonElement>) => void;
type User = { profileImage: string, username: string, _id: string };

interface Props {
  title: string,
  likes: number,
  closeHandler: CloseHandler,
  postId: string,
  getLikes: (postId: string, currentPage: number) => Promise<{data: { userLikes: User[]}}>,
}

interface State {
  userLikes: {
    likes: User[],
    currentPage: number
  },
  loadingLikes: boolean
}

export class LikesModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userLikes: {
        likes: [],
        currentPage: 1,
      },
      loadingLikes: false,
    };
    this.getMoreLikes = this.getMoreLikes.bind(this);
  }

  async componentDidMount() {
    const { postId, getLikes } = this.props;
    const { userLikes } = this.state;

    await getLikes(postId, userLikes.currentPage)
      .then((res) => {
          this.setState({
            userLikes: {
              ...userLikes,
              likes: res.data.userLikes,
            },
          });
      });
  }

  getMoreLikes: GetMoreLikes = async (e) => {
    const { postId, getLikes } = this.props;
    const { userLikes } = this.state;

    e.preventDefault();
    this.setState({ loadingLikes: true });
    const div: HTMLElement | null = document.getElementById('likes-id');
    if(div !== null) {
      const value: number = div.scrollHeight - 285;
      const info = await getLikes(postId, userLikes.currentPage + 1);
      this.setState({
        userLikes: {
          likes: [...userLikes.likes, ...info.data.userLikes],
          currentPage: userLikes.currentPage + 1
        }});
      div.scrollTop = value;
    }
    this.setState({ loadingLikes: false });
  }

  render() {
    const { title, likes, closeHandler } = this.props;
    const { userLikes, loadingLikes } = this.state;

    return (
      <div className="likes-modal-container">
        <div className="modal-top">
          <p>
            {title}
            {' '}
            -
            {' '}
            {likes}
            {' '}
            {likes === 1 ? 'like' : 'likes'}
          </p>
          <button type="button" onClick={closeHandler}>x</button>
        </div>
        <div className="modal-content" id="likes-id">
          {userLikes.likes.length === 0 ? (
            <div className="like-container">
              <span>Loading</span>
              <Spinner />
            </div>
          )
            : userLikes.likes.map((item) => (
              <LikeComponent
                profileImage={item.profileImage}
                username={item.username}
                userId={item._id}
                key={Math.random()}
              />
            ))}

          <div className="more-likes">
            {userLikes.likes.length !== 0 && likes > userLikes.likes.length && (
              <>
                {!loadingLikes ? (
                  <button type="button" onClick={this.getMoreLikes}>
                    Load
                    {' '}
                    {likes - userLikes.likes.length > 10 ? 10 : likes - userLikes.likes.length}
                    {' more likes'}
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
        <div className="modal-bottom" />
      </div>
    );
  }
}

export default LikesModal;
