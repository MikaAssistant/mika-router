'use strict';
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('nlp',function(msg){
        console.log('nlp: '+ msg);
        socket.broadcast.emit('nlp',msg);
    });
    socket.on('kernel',function(msg){
        console.log('kernel: '+ msg);
        socket.broadcast.emit('kernel',msg);
    });
    socket.on('client',function(msg){
        console.log('client: '+ msg);
        socket.broadcast.emit('client',msg);
    });
});

http.listen(env.HTTP_PORT, function(){
    console.log('Mika Router Listening:'+env.HTTP_PORT);
});