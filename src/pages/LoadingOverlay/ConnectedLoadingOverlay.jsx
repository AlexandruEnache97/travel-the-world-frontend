import { connect } from 'react-redux';
import LoadingOverlay from './LoadingOverlay';

const mapStateToProps = (state) => ({ loading: state.loading });

export default connect(mapStateToProps)(LoadingOverlay);
