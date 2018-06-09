'use strict';
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('nlp',function(msg){
        console.log('nlp: '+ msg+' <'+Date()+'>');
        socket.broadcast.emit('nlp',msg);
    });
    socket.on('kernel',function(response){
        console.log('kernel: '+ response+' <'+Date()+'>');
        socket.broadcast.emit('kernel',response);
    });
    socket.on('client',function(response){
        console.log('client: '+ response+' <'+Date()+'>');
        socket.broadcast.emit('client',response);
    });
});

http.listen(env.HTTP_PORT, function(){
    console.log('Mika Router Listening:'+env.HTTP_PORT);
});