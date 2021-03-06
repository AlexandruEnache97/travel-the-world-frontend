import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut as signOutAction } from '../../redux/actions/authActions';
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
  getLikedPosts as getLikedPostsAction,
} from '../../redux/actions/postActions';
import { createAlert as createAlertAction } from '../../redux/actions/alertActions';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts: getPostsAction,
  createPost: createPostAction,
  signOut: signOutAction,
  getLikedPosts: getLikedPostsAction,
  createAlert: createAlertAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
