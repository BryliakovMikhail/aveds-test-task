import { ref } from 'vue';
import { useRootStore } from '@/stores/root';
import { useRoute, useRouter } from 'vue-router';

export default function () {
  const rootStore = useRootStore();
  const router = useRouter();
  const route = useRoute();

  const openModal = ref(false);

  const doOpenOrExit = () => {
    if (!rootStore.loginInfo.isLogin) {
      openModal.value = true;
    } else {
      rootStore.loginInfo.isLogin = false;
      localStorage.setItem(
        'loginInfo',
        JSON.stringify({ user: null, isLogin: null })
      );
      if (route.name === 'main') {
        return;
      } else {
        router.push({ name: 'main' });
      }
    }
  };

  return {
    openModal,

    doOpenOrExit,
  };
}
