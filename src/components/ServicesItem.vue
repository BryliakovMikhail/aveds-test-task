<template>
  <a class="services-item" tabindex="1">
    <img :src="item.img" alt="" class="services-item__img" />
    <h5 class="services-item__title">{{ item.title }}</h5>
    <p class="services-item__descr">{{ item.descr }}</p>
  </a>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    require: true,
  },
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/main';
.services-item {
  padding: 35px 40px;
  box-shadow: 0px 13px 19px 0px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  transition: outline 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:focus {
    outline: 1px solid $primary;
    outline-offset: 4px;
  }
  &:hover {
    transform: scale(1.02);
    .services-item__title::after {
      transform: scaleX(2.5) translateX(15px);
    }
  }
  &:active {
    transform: scale(0.95);
    outline: none;
  }

  @media (max-width: 1024px) {
    padding: 20px;
  }
  @media (max-width: 788px) {
    width: 80%;
    padding: 35px 40px;
  }
  @media (max-width: 576px) {
    width: 100%;
    padding: 35px 40px;
  }

  &__title {
    position: relative;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: $textColor;

    @media (max-width: 1024px) {
      font-size: 14px;
      line-height: 18px;
    }

    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: -20px;
      width: 50px;
      height: 2px;
      background: rgba(231, 64, 64, 1);
      transition: transform 0.2s ease-in-out;
      @media (max-width: 1024px) {
        bottom: -15px;
      }
      @media (max-width: 576px) {
        bottom: -24px;
      }
    }
  }

  &__descr {
    margin-top: 42px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: $grey;

    @media (max-width: 1024px) {
      margin-top: 28px;
      font-size: 12px;
      line-height: 16px;
    }

    @media (max-width: 576px) {
      margin-top: 46px;
      font-size: 14px;
    }
  }
}
</style>
