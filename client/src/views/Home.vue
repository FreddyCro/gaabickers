<template lang="pug">
div.home
  form#chat-form
    input#msg(type="text" v-model="text")
    button(@click="submit") submit
</template>

<script>
import { io } from 'socket.io-client';

const socket = io();
const user = `user-${(Math.random() * 100) | 0}`;

// join when user enter
socket.emit('joinRoom', user);

// listener to other users enter
socket.on('roomUsers', newUser => {
  if (newUser !== user) console.log(`${newUser} enter!`);
});

// listener to message
socket.on('message', message => console.log(message));

export default {
  name: 'Home',
  data: () => ({
    text: ''
  }),
  methods: {
    submit() {
      socket.emit('chatMessage', { userName: user, text: this.text });
    }
  }
};
</script>
