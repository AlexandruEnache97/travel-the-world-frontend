import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth as verifyAuthAction } from '../../redux/actions/authActions';
import LandingPage from './LandingPage';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  verifyAuth: verifyAuthAction,
},
dispatch);

export default connect(null, mapDispatchToProps)(LandingPage);
