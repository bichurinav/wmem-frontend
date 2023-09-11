<template>
  <div class="main-wrapper">
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
  .main-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2px);
    color: #fff;
    display: flex;
    justify-content: center;
  }
</style>
