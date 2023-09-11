import { defineStore } from 'pinia';
import client from '@/api/client';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    user: null,
  }),

  actions: {
    async createRoom() {
      return new Promise((resolve, reject) => {
        client.post('/room/create').then((res) => {
          const { data } = res;
          resolve(data);
        }).catch((e) => reject(e));
      });
    },

    async getRoom(roomID) {
      return new Promise((resolve, reject) => {
        client.get(`/room/${roomID}`).then((res) => {
          const { data } = res;
          resolve(data);
        }).catch((e) => reject(e));
      });
    },

    async getUser({ roomID, socketID }) {
      return new Promise((resolve, reject) => {
        client.get('/user', { params: { roomID, socketID } }).then((res) => {
          const { data } = res;
          resolve(data);
        }).catch((e) => reject(e));
      });
    },
  },
});
