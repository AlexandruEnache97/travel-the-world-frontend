import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
} from '../../redux/actions/postActions';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts: getPostsAction,
  createPost: createPostAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
