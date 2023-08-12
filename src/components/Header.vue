<template>
  <header class="header">
    <router-link :to="{ name: 'main' }" class="header__logo">
      <img src="/images/logo.svg" alt="logo" />
    </router-link>
    <router-link :to="{ name: 'contacts' }" class="header__link"
      >Контакты</router-link
    >
    <button class="header__btn btn-reset" @click.prevent="doOpenOrExit">
      {{ btnText }}
    </button>
  </header>
  <BaseModal v-model:open="openModal">
    <PopupEntry />
  </BaseModal>
</template>
<script setup>
import { watch, ref } from 'vue';
import { useRootStore } from '@/stores/root';
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
@import '@/assets/styles/main';
.header {
  padding: 20px 70px 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $black;

  @media (max-width: 576px) {
    padding: 22px 10px 21px;
  }

  &__logo {
    margin-right: auto;
  }
  &__link {
    font-family: 'OpenSans';
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: $grey;
    transition: color 0.2s ease-in-out;

    &:focus {
      color: $focusColor;
    }
    &:hover {
      color: $primary;
    }
    &:active {
      color: $activeColor;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 20px;
    }
  }
  &__btn {
    margin-left: 58px;
    padding: 6px 58px;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: $primary;
    border: 2px solid $primary;
    border-radius: 7px;
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

    @media (max-width: 1024px) {
      margin-left: 28px;
      padding: 4px 38px;
      font-size: 18px;
      line-height: 22px;
    }

    @media (max-width: 768px) {
      margin-left: 20px;
      padding: 4px 22px;
      font-size: 16px;
      line-height: 20px;
    }

    @media (max-width: 576px) {
      margin-left: 11px;
      padding: 4px 17px;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
    }

    &:focus {
      background: $focusColor;
      color: $white;
    }
    &:hover {
      background: $primary;
      color: $white;
    }
    &:active {
      background: $activeColor;
      color: $white;
    }
  }
}
</style>
