import { connect } from 'react-redux';
import CommentsModal from './CommentsModal';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentsModal);
