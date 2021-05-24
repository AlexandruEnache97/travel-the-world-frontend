/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nrOfPosts: -1,
    };
    this.observer = React.createRef();
    this.handleCallback = this.handleCallback.bind(this);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { posts, getMorePosts } = this.props;
    const { loading } = this.state;

    if (posts !== prevProps.posts) {
      this.setState({ nrOfPosts: posts.length });
    } else if (loading !== prevState.loading) {
      if (loading) {
        await getMorePosts();
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
      }
    }
  }

  handleCallback(post) {
    const { hasMore } = this.props;
    const { loading } = this.state;

    if (this.observer.current) this.observer.current.disconnect();
    this.observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        this.observer.current.unobserve(post);
        this.setState({ loading: true });
      }
    });
    if (post) this.observer.current.observe(post);
  }

  render() {
    return (
      <div>
        {this.state.nrOfPosts === 0 ? (
          <div className="profile-no-posts">
            <p>There are no posts. Create one</p>
          </div>
        ) : this.props.posts.map((post, index) => {
          const checkLikedPost = () => {
            let postLiked = false;
            this.props.likedPosts.map((likedPost) => {
              if (likedPost === post._id) {
                postLiked = true;
                return postLiked;
              }
            });
            return postLiked;
          };

          if (this.props.posts.length === index + 1) {
            return (
              <Post
                postRef={this.handleCallback}
                postId={post._id}
                userData={post.userData}
                title={post.title}
                text={post.text}
                location={post.location}
                country={post.country}
                category={post.category}
                coordinates={post.coordinates}
                image={post.postImage}
                likes={post.likes}
                shares={post.shares}
                createdDate={post.createdDate}
                key={post.title + Math.random(0, 10000)}
                liked={checkLikedPost()}
                createAlert={this.props.createAlert}
              />
            );
          }
          return (
            <Post
              postId={post._id}
              userData={post.userData}
              title={post.title}
              text={post.text}
              location={post.location}
              country={post.country}
              category={post.category}
              coordinates={post.coordinates}
              image={post.postImage}
              likes={post.likes}
              shares={post.shares}
              createdDate={post.createdDate}
              key={post.title + Math.random(0, 10000)}
              liked={checkLikedPost()}
              createAlert={this.props.createAlert}
            />
          );
        })}
      </div>
    );
  }
}

ListPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    postImage: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shares: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  })).isRequired,
  likedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasMore: PropTypes.bool.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default ListPost;
