import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute.tsx';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
