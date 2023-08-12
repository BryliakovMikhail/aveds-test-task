import { computed } from 'vue';
import { defineStore } from 'pinia';
import usersData from '@/data/usersData.json';

export const useRootStore = defineStore('root', {
  state: () => ({
    users: computed(() => {
      return usersData.users;
    }),
    loginInfo: JSON.parse(localStorage.getItem('loginInfo')) || {
      user: null,
      isLogin: null,
    },
  }),
  actions: {
    findUser(login, password) {
      return this.users.find(
        (user) => user.login === login && user.password === password
      );
    },
  },
});
