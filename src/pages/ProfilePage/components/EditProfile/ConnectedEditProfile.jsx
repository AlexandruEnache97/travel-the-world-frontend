import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAlert as createAlertAction } from '../../../../redux/actions/alertActions';
import EditProfile from './EditProfile';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAlert: createAlertAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(EditProfile);
