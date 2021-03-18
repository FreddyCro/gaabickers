<template lang="pug">
div.room-list
  div(v-for="room in $store.state.chat.roomList" :key="room.name")
    p {{ room.name }}
    button(@click.prevent="joinRoom(room.name)") Join
    button(@click.prevent="leaveRoom(room.name)") Leave
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'RoomList',
  methods: {
    ...mapMutations(['joinRoom', 'leaveRoom'])
  }
};
</script>

<style lang="scss"></style>
