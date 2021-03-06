import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn as signInAction } from '../../../redux/actions/authActions';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signIn: signInAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
