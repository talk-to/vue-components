<template>
  <GenericModal @close="close" :background="background" :closeOnBgClick="closeOnBgClick">
    <div class="header">
      <span class="title">{{title}}</span>
      <div class="close">
        <span @click="close"><CloseSVG /></span>
      </div>
    </div>
    <slot></slot>
  </GenericModal>
</template>
<script>
/* Usage:
<FlockModal @close="showModal = false" v-if="showModal" title="Settings">
  Content here.
</FlockModal>
 */
import CloseSVG from '../assets/close.svg';
import GenericModal from './GenericModal.vue';

export default {
  components: {
    GenericModal,
    CloseSVG,
  },
  props: {
    title: String,
    closeOnBgClick: {
      default: false,
      type: Boolean,
    },
    background: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
.close {
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
</style>
