<template>
  <div>
    <Header />
    <slot />
  </div>
</template>
<script setup>

import Header from '@/components/Header.vue';
</script>
<style scoped lang="scss">
@import '@/assets/styles/main';
</style>
