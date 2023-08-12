<template>
  <AppLayout>
    <main class="main container" v-if="!user">
      <section class="hero">
        <h2 class="hero__title">
          Вход в аккаунт не был выполнен, пожалуйста авторизуйтесь
        </h2>
        <div class="btns-wrapper">
          <BtnBase class="entry-btn" @click.prevent="doOpenOrExit">Войти в аккаунт</BtnBase>
        </div>
      </section>
    </main>
    <main class="main container" v-if="user">
      <section class="hero">
        <h2 class="hero__title">Привет, {{ user.name }}</h2>
        <div class="btns-wrapper">
          <BtnBase class="entry-btn" @click.prevent="doOpenOrExit">Выйти из аккаунта</BtnBase>
          <router-link :to="{ name: 'contacts' }">
            <BtnBase
              class="contact-btn"
              >Перейти в контакты</BtnBase
            >
          </router-link>
        </div>
      </section>
    </main>
    <BaseModal v-model:open="openModal">
      <PopupEntry @close="openModal = false" />
    </BaseModal>
  </AppLayout>
</template>
<script setup>
import { computed } from 'vue';
import { useRootStore } from '@/stores/root';
import AppLayout from '@/components/AppLayout.vue';
import BtnBase from '@/components/BtnBase.vue';
import BaseModal from '@/components/BaseModal.vue';
import PopupEntry from '@/components/PopupEntry.vue';
import useOpenOrExit from '@/hooks/useOpenOrExit';

const rootStore = useRootStore();

const user = computed(() => {
  return rootStore.loginInfo.user;
});

const { doOpenOrExit, openModal } = useOpenOrExit();
</script>
<style scoped lang="scss">
.main{
  padding-top: 142px;
}
.btns-wrapper{
  margin-top: 25px;
}
</style>
