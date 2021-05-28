import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAlert as createAlertAction } from '../../../../redux/actions/alertActions';
import ChangeImage from './ChangeImage';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAlert: createAlertAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(ChangeImage);
