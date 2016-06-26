import React, {Component, PropTypes} from 'react';

/**
 * Class that defines a Chat presentational component.
 * This view displays the chatbox and all elements contained within.
 */
class Chat extends Component {
  /**
   * Override the componentDidMount component so we can scroll to the bottom
   * of the chatbox as the user sends or receives new messages.
   * @override
   */
  componentDidUpdate() {
    let node = document.getElementsByClassName('messages')[0];
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const {messages, user, sendMessage} = this.props;
    let input;

    return (
      <div className="chatbox">
        <ul className="messages">
          {messages.map(message =>
            <li key={message.id}>{message.user}: {message.text}</li>
          )}
        </ul>
        <form onSubmit={e => {
          e.preventDefault();

          // Do nothing if there is no text to send.
          if (!input.value.trim()) {
            return;
          }

          sendMessage({
            text: input.value,
            user: user.name
          });

          input.value = '';
        }}>
          <input autoFocus ref={node => {
            input = node;
          }} />
          <button type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  user: React.PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default Chat;
