'use strict';
const env = require('dotenv').config().parsed;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('nlp',function(response){
        console.log('nlp: <'+Date()+'>');
        console.log(response);
        socket.broadcast.emit('nlp',response);
    });
    socket.on('kernel',function(response){
        console.log('kernel: <'+Date()+'>');
        console.log(response);
        socket.broadcast.emit('kernel',response);
    });
    socket.on('client',function(response){
        console.log('client: <'+Date()+'>');
        console.log(response);
        socket.broadcast.emit('client',response);
    });
});

http.listen(env.HTTP_PORT, function(){
    console.log('Mika Router Listening:'+env.HTTP_PORT);
});