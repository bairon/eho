import {connect} from 'react-redux';
import {sendMessage} from '../actions';
import ChatBox from '../components/ChatBox';

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => {
      dispatch(sendMessage(message));
    }
  };
};

const ChatBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox);

export default ChatBoxContainer;
