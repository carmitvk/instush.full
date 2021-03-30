//npm i socket.io-client@2.2.0
import io from 'socket.io-client';


const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3030'
var socket = io(BASE_URL);


export const chatService = {
    sendMsg,
    setUserId,
    userTyping,
    getMsgListener,
    // getUsersListener,
    getTypingListener
}

function sendMsg(msg){
    return socket.emit('msg-data',msg)
}

function setUserId(data){
    return socket.emit('userId', data)
}

function userTyping(data){
    return socket.emit('user-typing', data)
}

function getMsgListener(callback){
    return socket.on('msg-data', callback);
}

// function getUsersListener(callback){
//     return socket.on('user-list', callback);
// }

function getTypingListener(callback){
    return socket.on('user-typing', callback);
}