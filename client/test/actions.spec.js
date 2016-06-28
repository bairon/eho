import {expect} from 'chai';
import {sendMessage, SEND_MESSAGE} from '../app/actions';

describe('actions', () => {
  it('should create an action to send a message', () => {
    const message = "Hello World!";
    const expectedAction = {
      type: SEND_MESSAGE,
      message
    };

    expect(sendMessage(message)).to.eql(expectedAction);
  });
});
