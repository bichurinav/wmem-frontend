<script setup>
import {
  ref, watch,
} from 'vue';
import { socket, state } from '@/socket';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';

const nicknameInput = ref('');
const message = ref('');
const input = ref(null);
const interval = ref('');
const storeApp = useAppStore();
const router = useRouter();

const updateNickname = (event) => {
  const value = event.target.textContent;
  input.value.textContent = value.replace(/[^а-я]+/gi, '');
  nicknameInput.value = input.value.textContent;
  input.value.focus();
  const range = document.createRange();
  range.selectNodeContents(input.value);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

const joinRoomID = sessionStorage.getItem('joinRoomID');

const checkValid = () => {
  let isValid = true;

  if (nicknameInput.value.length < 2 || !nicknameInput.value.length) {
    message.value = 'Ай, недостаточно букв!';
    isValid = false;
  }

  if (nicknameInput.value.length > 15) {
    message.value = 'Ай, много букв!';
    isValid = false;
  }

  if (!isValid) {
    clearInterval(interval.value);
    interval.value = setTimeout(() => {
      message.value = '';
    }, 1500);
  }

  return isValid;
};

const createRoom = async () => {
  const isValid = checkValid();

  if (!isValid) return;

  storeApp.createRoom().then((data) => {
    socket.connect();
    socket.emit('users:add', { roomID: data?.roomID, nickname: nicknameInput.value });
  }).finally(() => {
    nicknameInput.value = '';
    input.value.textContent = '';
  });
};

const connectRoom = async () => {
  const isValid = checkValid();

  if (!isValid) return;

  const nickname = nicknameInput.value;

  storeApp.getRoom(joinRoomID).then((data) => {
    if (!data) {
      sessionStorage.setItem('joinRoomID', '');
      router.go(0);
      return;
    }
    socket.connect();
    socket.emit('users:add', { roomID: data?.roomID, nickname });
  }).finally(() => {
    nicknameInput.value = '';
    input.value.textContent = '';
  });
};

watch(() => state.user, (user) => {
  if (user) {
    router.push({ name: 'room', params: { roomID: user?.roomID } });
  }
});
</script>

<template>
  <form class="form" @submit.prevent>
    <h2>🕵️‍♂️ Это что такое?</h2>
    <div class="content">
      <div class="label">
        <span v-if="!message">Введите &#x1f1f7;&#x1f1fa; русский никнейм</span>
        <span v-else>{{ message }}</span>
        <div ref="input" class="input" contenteditable="true" aria-readonly="true" @input="updateNickname" />
      </div>

      <button v-if="joinRoomID" class="button button--connect" type="button" @click="connectRoom">
        Присоединиться
      </button>
      <button class="button" type="button" @click="createRoom">
        Создать игру 😋
      </button>
    </div>
  </form>
</template>

<style lang='scss' scoped>
  .form {
    margin-top: 64px;
    .content {
      margin-top: 24px;
      min-width: 280px;
    }
    .button {
      margin-top: 12px;
    }
  }
</style>
