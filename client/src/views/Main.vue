<template lang="pug">
div.home
  h1(v-if="state.service.socket.isConnection") hi

  div.login
    form#input-user-name
      input#name(type="text" v-model="inputUserName")
      button(@click="userLogin(inputUserName)") login


  div.user-info
    p {{ `name: ${state.user.name}` }}
    p {{ `id: ${state.user.id}` }}

  div.chat-container
    div.chat-message(v-if="chat.messages.length > 0" v-for="msg in chat.messages" :key="msg.time")
      p {{ `${msg.name}: ${msg.text} at ${msg.time || (new Date())}` }}

  div.chat-input
    form#chat-form
      input#msg(type="text" v-model="text")
      button(@click="submit") submit
</template>

<script>
import { mapMutations } from 'vuex';

// import { createNamespacedHelpers } from 'vuex';
// const { mapActions } = createNamespacedHelpers('chat');

// import { io } from 'socket.io-client';

// const socket = io();
// const user = `user-${(Math.random() * 100) | 0}`;

// // join when user enter
// socket.emit('joinRoom', user);

// // listener to other users enter
// socket.on('roomUsers', newUser => {
//   if (newUser !== user) console.log(`${newUser} enter!`);
// });

// // listener to message
// socket.on('message', message => console.log(message));

export default {
  name: 'Main',
  data: () => ({
    inputUserName: '',
    text: ''
  }),
  computed: {
    state() {
      return this.$store.state;
    },
    chat() {
      return this.$store.state.chat;
    }
  },
  methods: {
    ...mapMutations(['initService', 'userLogin', 'addMessage']),
    submit() {
      this.state.service.socket.emit('chatMessage', {
        name: this.state.user.name,
        text: this.text
      });
    }
  },
  created() {
    this.initService();
    this.state.service.socket.on('message', msg => this.addMessage(msg));
  }
};
</script>
