<template>
  <div
    class="modal"
    @click="bgClicked"
    :style="{ background }"
    :class="{'stretch': (background || closeOnBgClick)}"
  >
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    background: {
      default: '',
      type: String,
    },
    closeOnBgClick: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    bgClicked() {
      if (this.closeOnBgClick) {
        this.$emit('close');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: left;
  max-width: 80%;
  max-height: 80%;
  &.stretch {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: none;
    .modal-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .modal-content {
    padding: 1.5em;
    @include borderRadius();
    @include boxShadow();
    background: white;
    color: $text-secondary;
  }
}
</style>
