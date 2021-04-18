import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapComponent from './MapComponent';
import { signOut as signOutAction } from '../../redux/actions/authActions';

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut: signOutAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
