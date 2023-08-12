<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="popup" @click.prevent="outsideClick">
      <div ref="contentElement" class="popup__content">
        <button class="btn-close btn-reset" @click.prevent="doClose">X</button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref, defineEmits, watch, computed } from 'vue';

let openedCount = 0;
let atleastOneOpen = false;

const props = defineProps({
  open: {
    type: Boolean,
    require: true,
  },
});

const emit = defineEmits();

const contentElement = ref(null);

const doClose = () => {
  emit('update:open', false);
};

const outsideClick = (event) => {
  if (
    event.target !== contentElement.value &&
    event.target.contains(contentElement.value)
  ) {
    doClose();
  }
};

const checkPopupsState = () => {
  if (!openedCount) {
    atleastOneOpen = false;
    document.body.style.overflow = null;
    document.body.style.paddingRight = null;
  } else if (!atleastOneOpen && openedCount === 1) {
    atleastOneOpen = true;
    document.body.style.paddingRight =
      window.innerWidth - document.documentElement.clientWidth + 'px';
    document.body.style.overflow = 'hidden';
  }
};

const isOpen = computed(() => {
  return props.open;
});

watch(isOpen, (newValue) => {
  if (newValue) {
    openedCount += 1;
  } else {
    openedCount -= 1;
  }
  checkPopupsState();
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/main';
.popup {
  position: absolute;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  &__content {
    position: relative;
    padding: 30px;
    width: 40%;
    background: $white;
    border-radius: 10px;
    @media (max-width: 1024px) {
      width: 80%;
    }
    @media (max-width: 768px) {
      width: 90%;
    }
    @media (max-width: 576px) {
      padding: 20px;
    }
  }
}
.btn-close {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px;
  background: #d9d9d9;
  width: 30px;
  height: 30px;
  border-radius: 50px;
}
</style>
