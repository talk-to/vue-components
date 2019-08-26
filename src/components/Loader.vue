<template>
  <div class="loader">
    <div class="loader-container" v-if="loading" :style="style">
      <LoaderSVG
        class="loader-icon"
      />
      <div v-if="loaderText" class="loader-text">
        {{ loaderText }}
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import LoaderSVG from '../assets/loader-green.svg';

export default {
  components: {
    LoaderSVG,
  },
  data() {
    return {
      style: {},
    };
  },
  props: {
    loaderText: String,
    loading: {
      default: true,
      type: Boolean,
    },
    fullPage: {
      default: false,
      type: Boolean,
    },
  },
  created() {
    if (this.fullPage) {
      this.style = {
        position: 'fixed',
        zIndex: '1',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      };
    }
  },
};
</script>
<style lang="scss" scoped>
.loader-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.loader-icon {
  height: 32px;
  width: 32px;
}
.loader-text {
  margin-top: 1em;
}
</style>
