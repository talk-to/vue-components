<template>
  <button class="link" @click="onClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  methods: {
    onClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  cursor: pointer;
  color: $primary;
  font-weight: 500;
  display: inline-block;
  font-size: 1em;
  border: none;
  background: none;
  &:hover {
    text-rendering: none;
  }
  &:focus {
    outline: none;
  }
}
</style>
