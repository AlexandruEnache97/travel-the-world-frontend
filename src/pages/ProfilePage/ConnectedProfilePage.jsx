import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  signOut as signOutAction,
  getAccount as getAccountAction,
} from '../../redux/actions/authActions';
import { createPost as createPostAction } from '../../redux/actions/postActions';

import ProfilePage from './ProfilePage';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut: signOutAction,
  createPost: createPostAction,
  getAccount: getAccountAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
