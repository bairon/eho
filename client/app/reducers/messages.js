const messages = (state = [], action) => {
  switch (action.type) {
    case 'RECV_MESSAGE':
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

export default messages;
