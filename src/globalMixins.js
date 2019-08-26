import Vue from 'vue';
import eventBus from './eventBus';

Vue.config.productionTip = false;

function triggerGlobalClick(e) {
  e.stopPropagation();
  eventBus.$emit('focusChanged', this);
}
function onKeyDown(e) {
  eventBus.$emit('onKeyDown', e);
}
document.addEventListener('click', triggerGlobalClick);
document.addEventListener('keydown', onKeyDown);

Vue.mixin({
  mounted() {
    this.$el.addEventListener('click', triggerGlobalClick);
  },
  beforeDestroy() {
    this.$el.removeEventListener('click', triggerGlobalClick);
  },
});

export default eventBus;
