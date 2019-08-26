<template>
  <div
    v-if="show"
    class="toast">
    <Banner
      :styles="toastStyles"
      :position="position"
    >
      <slot></slot>
    </Banner>
  </div>
</template>
<script>
import Banner from './Banner.vue';

export default {
  components: {
    Banner,
  },
  props: {
    styles: {
      type: Object,
      default() { return {}; },
    },
    time: {
      type: Number,
      default: 5000,
    },
    position: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      show: true,
      toastStyles: {
        opacity: 0.9,
        right: 'unset',
        transform: 'translateX(-50%)',
        left: '50%',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderRadius: '4px',
        maxWidth: '96%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...this.styles,
      },
    };
  },
  created() {
    setTimeout(() => {
      this.show = false;
      this.$emit('toasthidden');
    }, this.time);
  },
};
</script>
