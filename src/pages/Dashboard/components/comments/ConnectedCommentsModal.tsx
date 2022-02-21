import { connect } from 'react-redux';
import { authUser } from '../../../../utils/typescriptUtils';
import CommentsModal from './CommentsModal';

interface State {
  auth: authUser
}

const mapStateToProps = (state: State) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentsModal);
