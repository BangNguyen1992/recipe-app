'use strict';
/* global io $ document window */

/**
 * @param {string} app_id the application identifier send to the server
 */
function initSocket(app_id) {
  console.log('using hostname: ' + window.location.hostname);
  const socket = io('http://localhost:3000/');
  let sessionid;
  // register room to the server
  socket.on('connect', function() {
    console.log('socket.io connected!');
    sessionid = socket.io.engine.id;
    socket.emit('app_id', app_id);
  });

  // on response
  socket.on('message', function(data) {
    let sender = data.socketid;
    if (data.socketid === sessionid) {
      sender = 'you';
    }
    console.log('message from ' + sender + ': ' + JSON.stringify(data));

    $('#messages').append(data.client_name + ' was looking for dishes made from"' + data.str + '"</br>');
  });

  // sending messages
  $('#inpt_search').bind('keypress', function(e) {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && socket) { // keyboard Enter
      const msg = {};
      msg.client_name = $('#name').val();
      msg.app_id = app_id;
      msg.time = Date.now();
      msg.str = $('#inpt_search').val();
      socket.json.emit('message', msg);
      // $('#inpt_search').val('');
      onSearch(e);
    }
  });
}

/** @function */
function initNameCheck() {
  $('#inpt_search').prop('disabled', true);
  $('#inpt_search').css({ 'background-color': 'grey' });

  $('#name').on('change paste keyup', function() {
    if ($('#name').val()) {
      $('#inpt_search').prop('disabled', false);
      $('#inpt_search').css({ 'background-color': 'white' });
    } else {
      $('#inpt_search').prop('disabled', true);
      $('#inpt_search').css({ 'background-color': 'grey' });
    }
  });
}

$(document).ready(function() {
  initNameCheck();
  initSocket('171992');
});