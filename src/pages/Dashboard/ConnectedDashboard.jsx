import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
