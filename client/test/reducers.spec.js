import {expect} from 'chai';
import {RECV_MESSAGE} from '../app/actions';
import reducer from '../app/reducers/messages';

describe('message reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql([]);
  });

  it('should handle RECV_MESSAGE', () => {
    const firstMessageText = "Hello World!";
    expect(
      reducer([], {
        type: RECV_MESSAGE,
        message: firstMessageText
      })
    ).to.eql([firstMessageText]);

    const secondMessageText = 'cow';
    const seededStateArray = ['how', 'now', 'brown'];
    expect(
      reducer(seededStateArray, {
        type: RECV_MESSAGE,
        message: secondMessageText
      })
    ).to.eql([...seededStateArray, secondMessageText]);
  });
});
