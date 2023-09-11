import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
  connected: false,
  user: null,
  list: [],
  message: '',
});

const URL = 'ws://localhost:3000';

export const socket = io(URL, {
  autoConnect: false,
});

export const clearData = () => {
  state.user = '';
};

socket.on('connect', () => {
  state.connected = true;
});

socket.on('users:add', (data) => {
  sessionStorage.setItem(
    'user',
    JSON.stringify(data),
  );
  state.user = data;
});

socket.on('users:get', (data) => {
  state.user = data;
});

socket.on('users:list', (data) => {
  state.list = data;
});

socket.on('users:exit', () => {
  state.connected = false;
});

socket.on('users:message', (message) => {
  state.message = message;
  // setTimeout(() => {
  //   state.message = '';
  // }, 2000);
});

socket.on('disconnect', () => {
  socket.emit('users:list');
  state.connected = false;
});
