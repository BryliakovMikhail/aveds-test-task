<template>
  <div class="services-list list-reset">
    <ServicesItem v-for="item in services" :key="item.id" :item="item" />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import servicesData from '@/data/servicesData.json';
import ServicesItem from '@/components/ServicesItem.vue';

const services = computed(() => {
  return servicesData.services;
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/main';

.services-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 30px;

  @media (max-width: 788px) {
    grid-template-columns: 1fr;
  }
}
</style>
