import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
  getLikedPosts as getLikedPostsAction,
} from '../../../../redux/actions/postActions';
import { createAlert as createAlertAction } from '../../../../redux/actions/alertActions';
import PostsContainer from './PostsContainer.tsx';

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts: getPostsAction,
  createPost: createPostAction,
  getLikedPosts: getLikedPostsAction,
  createAlert: createAlertAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
