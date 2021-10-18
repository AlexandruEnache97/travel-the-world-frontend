import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  removeAlert as removeAlertAction,
} from '../../redux/actions/alertActions';
import Alert from './Alert.tsx';

const mapStateToProps = (state) => ({
  alert: state.alert,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  removeAlert: removeAlertAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
