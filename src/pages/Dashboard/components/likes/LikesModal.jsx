/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './likesModal.scss';
import Spinner from '../../../../components/Spinner/Spinner';
import LikeComponent from './LikeComponent';

export class LikesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLikes: {
        likes: [],
        currentPage: 1,
      },
      loadingLikes: false,
    };
    this.getMoreLikes = this.getMoreLikes.bind(this);
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const { postId, getLikes } = this.props;
    const { userLikes } = this.state;

    await getLikes(postId, userLikes.currentPage)
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            userLikes: {
              ...userLikes,
              likes: res.data.userLikes,
            },
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getMoreLikes(e) {
    const { postId, getLikes } = this.props;
    const { userLikes } = this.state;

    e.preventDefault();
    this.setState({ loadingLikes: true });
    const div = document.getElementById('likes-id');
    const value = div.scrollHeight - 285;
    const info = await getLikes(postId, userLikes.currentPage + 1);
    if (this._isMounted) {
      this.setState({
        userLikes: {
          likes: [...userLikes.likes, ...info.data.userLikes],
          currentPage: userLikes.currentPage + 1,
        },
      });
      div.scrollTop = value;
      this.setState({ loadingLikes: false });
    }
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

LikesModal.propTypes = {
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  getLikes: PropTypes.func.isRequired,
};

export default LikesModal;
