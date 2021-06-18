import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapComponent from './MapComponent';
import { signOut as signOutAction } from '../../redux/actions/authActions';
import { getPosts as getPostsAction } from '../../redux/actions/postActions';

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut: signOutAction,
  getPosts: getPostsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
