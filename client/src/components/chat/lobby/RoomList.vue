<template lang="pug">
div.room-list
  div(v-for="room in $store.state.chat.roomList" :key="room.name")
    p {{ room.name }}
    button(@click="joinRoom($event, room.name)") Join
    button(@click="leaveRoom($event, room.name)") Leave
</template>

<script>
export default {
  name: 'RoomList',
  methods: {
    joinRoom(e, room) {
      e.preventDefault();
      this.$store.state.service.socket.emit('joinRoom', {
        userName: this.$store.state.user.name,
        room: room
      });
    },
    leaveRoom(e, room) {
      this.$store.state.service.socket.emit('leaveRoom', {
        userName: this.$store.state.user.name,
        room: room
      });
    }
  }
};
</script>

<style lang="scss"></style>
