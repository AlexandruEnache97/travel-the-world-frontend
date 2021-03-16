import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp as signUpAction } from '../../../redux/actions/authActions';
import Register from './Register';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signUp: signUpAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(Register);
