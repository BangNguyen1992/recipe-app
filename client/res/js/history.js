'use strict';
/* global io $ document window */

/**
 * @param {string} app_id the application identifier send to the server
 */
function initSocket(app_id) {
  console.log('using hostname: ' + window.location.hostname);
  const socket = io(window.location.hostnam);
  let sessionid;
  // register room to the server
  socket.on('connect', function() {
    console.log('socket.io connected!');
    sessionid = socket.io.engine.id;
    socket.emit('app_id', app_id);
  });

  socket.on('message', function(data) {
    let sender = data.socketid;
    if (data.socketid === sessionid) {
      sender = 'you';
    }
    console.log('message from ' + sender + ': ' + JSON.stringify(data));

    $('#messages').append(data.client_name + ' was looking for dishes made from"' + data.str + '"</br></br>');
  });

  // sending messages
  $('#inpt_search').bind('keypress', function(e) {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && socket) { // keyboard Enter
      const msg = {};
      $('#name').val() ? msg.client_name = $('#name').val() : msg.client_name = 'Anonymous';
      msg.app_id = app_id;
      msg.time = Date.now();
      msg.str = $('#inpt_search').val();
      socket.json.emit('message', msg);
      // $('#inpt_search').val('');
      onSearch(e);
    }
  });
}

$(document).ready(function() {
  initSocket('recipe');
});