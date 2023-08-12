<template>
  <AppLayout>
    <main class="main container">
      <section class="hero">
        <h2 class="hero__title">
          Страница не найдена, пожалуйста, попробуйте авторизоваться
        </h2>
        <div class="btns-wrapper">
          <BtnBase class="entry-btn" @click.prevent="doOpenOrExit"
            >Войти в аккаунт</BtnBase
          >
        </div>
      </section>
    </main>
    <BaseModal v-model:open="openModal">
      <PopupEntry @close="openModal = false" />
    </BaseModal>
  </AppLayout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import BtnBase from '@/components/BtnBase.vue';
import BaseModal from '@/components/BaseModal.vue';
import PopupEntry from '@/components/PopupEntry.vue';
import useOpenOrExit from '@/hooks/useOpenOrExit';

const { doOpenOrExit, openModal } = useOpenOrExit();
</script>
<style scoped lang="scss">
.main {
  padding-top: 142px;
}
.btns-wrapper {
  margin-top: 25px;
}
</style>
