import React, { Component } from 'react';
import Post from './postComponent/Post';
import { Post as PostType } from '../../../../utils/typescriptUtils';

interface Props {
  posts: PostType[],
  likedPosts: string[],
  savedPosts: string[],
  hasMore: boolean,
  getMorePosts: () => void,
  createAlert: (message: string, timeout: number) => void
}

interface State {
  loading: boolean,
  nrOfPosts: number
}

export class ListPost extends Component<Props, State> {
  observer: { current: IntersectionObserver | null };
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      nrOfPosts: -1,
    };
    this.observer = React.createRef();
    this.lastPostHandle = this.lastPostHandle.bind(this);
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
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

  lastPostHandle(post: Element) {
    const { hasMore } = this.props;
    const { loading } = this.state;

    if (this.observer.current) this.observer.current.disconnect();
    this.observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        if(this.observer.current) this.observer.current.unobserve(post);
        this.setState({ loading: true });
      }
    });
    if (post) this.observer.current.observe(post);
  }

  render() {
    return (
      <>
        {this.state.nrOfPosts === 0 ? (
          <div className="profile-no-posts">
            <p>There are no posts. </p>
            <p>Create one!</p>
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

          const checkSavedPost = () => {
            let checkSaved = false;
            this.props.savedPosts.map((savedPost) => {
              if (savedPost === post._id) {
                checkSaved = true;
                return checkSaved;
              }
            });
            return checkSaved;
          };

          if (this.props.posts.length === index + 1) {
            return (
              <Post
                post={post}
                postRef={this.lastPostHandle}
                key={post.title + Math.random() * 100}
                liked={checkLikedPost()}
                saved={checkSavedPost()}
                createAlert={this.props.createAlert}
              />
            );
          }
          return (
            <Post
              post={post}
              key={post.title + Math.random() * 100}
              liked={checkLikedPost()}
              saved={checkSavedPost()}
              createAlert={this.props.createAlert}
            />
          );
        })}
      </>
    );
  }
}

export default ListPost;
