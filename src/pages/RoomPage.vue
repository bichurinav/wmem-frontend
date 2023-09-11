<script setup>
import { onMounted } from 'vue';
import { socket, state } from '@/socket';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

onMounted(() => {
  if (!state.connected) {
    socket.connect();
  }
  socket.emit('users:get', appStore.$state.user);
  socket.emit('users:list', appStore.$state.user?.roomID);
});
</script>

<template>
  <div>
    <div>Hello Room! {{ state.user?.roomID }}</div>
    <div>Connected: {{ state.connected }}</div>
    <button type="button" @click="socket.disconnect()">
      Disconnect
    </button>
    <div v-if="state.message" style="color: red">
      Message: <b>{{ state.message }}</b>
    </div>
    <div v-for="(item, idx) in state.list" :key="idx" class="list">
      {{ item?.nickname }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
  div {
    color: white;
  }
</style>
