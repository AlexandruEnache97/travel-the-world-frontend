import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  signOut as signOutAction,
} from '../../redux/actions/authActions';
import UserPage from './UserPage';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut: signOutAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
