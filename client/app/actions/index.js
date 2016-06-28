// "server/" prefix required by the socket.io middleware.
export const SEND_MESSAGE = 'server/SEND_MESSAGE';
// Action type used in the messages sent from the server.
export const RECV_MESSAGE = 'RECV_MESSAGE';

/**
 * Action creator used to generate an action that denotes sending a message between clients.
 * Uses the socket.io middleware to bounce the message off the node server.
 * @param {Object} message The full message object to send to the other users
 * @return {Object} action The action used to send a message between clients
 *         {string} action.type The type of the action. In this case it should be SEND_MESSAGE ('server/SEND_MESSAGE')
 *         {Object} action.message The message object to send to the other clients
 */
export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message
  };
}
