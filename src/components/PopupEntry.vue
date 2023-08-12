<template>
  <div class="entry">
    <h2 class="entry-title">Авторизация</h2>
    <form class="entry-form">
      <label class="entry-form__label" for="login">
        <input
          :class="{ _error: v$.login.$dirty && v$.login.$invalid }"
          type="text"
          id="login"
          class="entry-form__input"
          placeholder="Введите логин"
          v-model.trim="login"
          @blur="v$.login.$touch"
          @input="checkErrorMessage"
        />
        <div class="error" v-if="v$.login.$dirty && v$.login.required.$invalid">
          Ввод логина обязателен
        </div>
      </label>
      <label class="entry-form__label" for="password">
        <input
          :class="{ _error: v$.password.$dirty && v$.password.$invalid }"
          type="password"
          class="entry-form__input"
          placeholder="Введите пароль"
          v-model.trim="password"
          @blur="v$.password.$touch"
          @input="checkErrorMessage"
        />
        <div
          class="error"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          Ввод пароля обязателен
        </div>
        <div
          class="error"
          v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          минимальное колличество символов -
          {{ v$.password.$errors[0].$params.min }}
        </div>
      </label>
      <BtnBase
        type="submit"
        class="entry-form__btn entry-btn"
        @click.prevent="singIn"
        >Войти</BtnBase
      >
      <div v-if="errorMessage" class="login-error">{{ errorMessage }}</div>
    </form>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
import BtnBase from '@/components/BtnBase.vue';
import { useRootStore } from '@/stores/root';
import { useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const emit = defineEmits();

const login = ref(null);
const password = ref(null);
const user = ref(null);
const errorMessage = ref('');

const rootStore = useRootStore();
const router = useRouter();
const route = useRoute();

const rules = {
  login: { required },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, {
  login,
  password,
});

const singIn = () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return
  }

  user.value = rootStore.findUser(login.value, password.value);

  if (user.value) {
    router.push({ name: 'user', params: { userlogin: user.value.login } });
    rootStore.loginInfo.isLogin = true;
    rootStore.loginInfo.user = user.value;
    localStorage.setItem(
      'loginInfo',
      JSON.stringify({ user: user.value, isLogin: rootStore.loginInfo.isLogin })
    );
    if (route.name === 'user') {
      setTimeout(() => {
        emit('close');
      }, 500);
    }
  } else {
    errorMessage.value = 'Неверный логин или пароль';
  }
};

const checkErrorMessage = () => {
  if (errorMessage.value) {
    setTimeout(() => {
      errorMessage.value = '';
    }, 300);
  } else return;
};
</script>

<style lang="scss">
@import '@/assets/styles/main';
.entry-title {
  text-align: center;
}
.entry-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__label {
    position: relative;
    width: 70%;
    &:not(:first-child) {
      margin-top: 20px;
    }
    @media (max-width: 576px) {
      width: 100%;
    }
  }
  &__input {
    width: 100%;
    padding: 15px 20px;
    border: 2px solid $grey;
    border-radius: 5px;
    font-size: 20px;
    letter-spacing: 1px;
    color: $textColor;
    transition: border-color 0.2s ease-in-out;

    @media (max-width: 576px) {
      padding: 10px;
      font-size: 14px;
    }

    &:focus {
      border-color: $focusColor;
    }
    &:hover {
      border-color: $primary;
    }
    &:active {
      border-color: $activeColor;
    }
  }

  &__btn {
    margin-top: 20px;
    padding: 10px 30px;
  }

  .error {
    position: absolute;
    top: 2px;
    left: 20px;
    font-size: 14px;
    color: #ba0202cc;

    @media (max-width: 576px) {
      top: 2px;
      left: 12px;
      font-size: 11px;
    }
  }
  ._error {
    border-color: #ba0202cc;
  }
  .login-error {
    position: absolute;
    bottom: 5px;
    color: #ba0202cc;
    animation: errorAnim 0.1s ease-in-out 0.1s 6 normal none;

    @media (max-width: 576px) {
      font-size: 12px;
    }
  }

  @keyframes errorAnim {
    0% {
      transform: translateX(4px);
    }
    50% {
      transform: translateX(-4px);
    }
    100% {
      transform: none;
    }
  }
}
</style>
