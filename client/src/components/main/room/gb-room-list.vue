<template lang="pug">
div.room-list
  div(v-for="room in $store.state.chat.roomList" :key="room.name")
    p {{ `${room.name}(${room.users.length})` }}
    button(@click.prevent="joinRoom(room.name)") Join
    button(@click.prevent="leaveRoom(room.name)") Leave
</template>

<script>
import { mapMutations } from 'vuex';
import { socketOnJoinRoomSuccess } from '@/services/user';

export default {
  name: 'GbRoomList',
  methods: {
    ...mapMutations(['joinRoom', 'leaveRoom'])
  },
  created() {
    const servcieConfig = [this.$store.state.service.socket, this.$store.state];
    socketOnJoinRoomSuccess(...servcieConfig);
  }
};
</script>

<style lang="scss"></style>
