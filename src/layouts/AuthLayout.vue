<script setup>
defineProps({});
</script>

<template>
  <div class="auth-wrapper">
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
  .auth-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    display: flex;
    justify-content: center;
  }
</style>
