<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/appStore';
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

export default {
  components: { MainLayout, AuthLayout },
  setup() {
    const router = useRouter();
    const layout = ref('main-layout');
    const appStore = useAppStore();

    // eslint-disable-next-line consistent-return
    router.beforeEach(async (to) => {
      const userSession = JSON.parse(sessionStorage.getItem('user') || null);
      let user = null;

      if (userSession) {
        user = await appStore.getUser(userSession);
        appStore.$patch({ user });
      }

      if (!user) {
        sessionStorage.setItem('user', '');
      }

      if (to.meta?.layout) {
        layout.value = `${to.meta.layout}-layout`;
      }

      if (to.params?.roomID) {
        const roomID = await appStore.getRoom(to.params.roomID);

        if (!roomID) {
          sessionStorage.setItem('joinRoomID', '');
          return { name: 'auth' };
        }

        if (roomID && !user) {
          sessionStorage.setItem('joinRoomID', roomID?.roomID);
          return { name: 'auth' };
        }

        if (roomID && user?.roomID !== to.params?.roomID) {
          return { name: 'auth' };
        }

        if (roomID && user?.roomID === to.params?.roomID) {
          return true;
        }
      }

      if (to.name === 'auth') {
        if (user) {
          const roomID = await appStore.getRoom(user?.roomID);
          if (roomID) {
            return { name: 'room', params: { roomID: user?.roomID } };
          }
        }
      }

      return true;
    });

    return { layout };
  },
};
</script>

<template>
  <component :is="layout" />
</template>
