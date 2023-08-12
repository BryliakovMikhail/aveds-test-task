<template>
  <AppLayout>
    <main class="main container">
      <section class="hero">
        <h1 class="hero__title">Место для получения медицинской помощи</h1>
        <div class="btns-wrapper">
          <BtnBase
            class="entry-btn"
            @click.prevent="doOpenOrExit"
            >{{ btnText }}</BtnBase
          >
          <router-link :to="{ name: 'contacts' }">
            <BtnBase
              class="contact-btn"
              :background="'#fff'"
              :colorText="'#ff685b'"
              :border="'1px solid #ff685b'"
              >Контакты</BtnBase
            >
          </router-link>
        </div>
      </section>
      <section class="services">
        <ServicesList />
      </section>
    </main>
    <BaseModal v-model:open="openModal">
      <PopupEntry />
    </BaseModal>
  </AppLayout>
</template>
<script setup>
import { watch, ref } from 'vue';
import { useRootStore } from '@/stores/root';
import AppLayout from '@/components/AppLayout.vue';
import BtnBase from '@/components/BtnBase.vue';
import ServicesList from '@/components/ServicesList.vue';
import BaseModal from '@/components/BaseModal.vue';
import PopupEntry from '@/components/PopupEntry.vue';
import useOpenOrExit from '@/hooks/useOpenOrExit';

const rootStore = useRootStore();

const btnText = ref('Войти');
watch(
  () => rootStore.loginInfo.isLogin,
  (newValue) => {
    if (newValue) {
      btnText.value = 'Выйти';
    } else {
      btnText.value = 'Войти';
    }
  },
  { immediate: true, deep: true }
);

const { openModal, doOpenOrExit } = useOpenOrExit();
</script>
<style scoped lang="scss">
</style>
