// TODO: gzip & svg compression on static resources?
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var appDist = '../client/dist';

app.use(express.static(path.join(__dirname, appDist)));
app.use(express.static(path.join(__dirname, './public')));

// Socket IO setup
var socketPort = 3000;

http.listen(socketPort, function() {
  console.log('listening on *:' + socketPort);
});

// User Setup
var nameGenerator = require('./names');
var users = {};
var generateUser = function(id) {
  var newUsername = nameGenerator.newName();
  console.log("generating user: " + newUsername);
  var newUser = {
    name: newUsername
  };

  users[id] = newUser;

  return newUser;
};

// TODO: Do we want to persist the chat logs?
// If so, the ID should actually be a string hash to allow for more info per character.
// Also it most likely should be persisted to the DB and not keep the entire history
// in memory.
var currentChatId = 0;
var chatLog = {};

io.on('connection', function(socket) {
  // Give a new random user to anyone who connects for now.
  socket.emit('action', {
    type:'NEW_USER',
    user: generateUser(socket.id)
  });

  socket.on('disconnect', function() {
    console.log('Removing ' + users[socket.id].name + ' from users');
    delete users[socket.id];
  });

  socket.on('action', function(action) {
    if (action.type === 'server/SEND_MESSAGE') {
      // Received a new message, assign an ID to it then add it to the log
      action.message.id = currentChatId;
      currentChatId += 1;
      chatLog[currentChatId] = action.message;

      // Broadcast the message to all connected clients.
      io.emit('action', {
        type:'RECV_MESSAGE',
        message: action.message
      });
    }
  });
});
