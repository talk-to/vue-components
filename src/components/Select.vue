<template>
  <div
    class="flock-select"
    @click.stop="toggle($event)"
    tabindex="0"
    :style="{ width: width ? width : 'unset' }"
  >
    <div class="label">{{ selectedLabel }}</div>
    <span/>
    <transition name="fade">
      <ul class="options" v-if="selectOpen">
        <li
          class="list-item"
          :class="[{'focussed': index === focusIndex}]"
          :key="index"
          v-for="(option, index) in options"
          @click="onChange(option)"
        >
          {{option.label}}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import eventBus from '../eventBus';

const ENTER = 'Enter';
const ARROW_DOWN = 'ArrowDown';
const ARROW_UP = 'ArrowUp';
export default {
  data() {
    let selectedLabel = 'Select a value';
    let focusIndex = 0;
    if (this.value) {
      focusIndex = this.options.findIndex(o => o.value === this.value);
      if (focusIndex >= 0) {
        const option = this.options[focusIndex];
        selectedLabel = option.label;
      }
    }
    return {
      focusIndex,
      selectOpen: this.open,
      selectedLabel,
    };
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    // Can make options an object so as to avoid loops later.
    options: {
      type: Array,
      default: () => ([]),
    },
    value: {
      type: [String, Object, Number],
      default: 'Select a value',
    },
    width: {
      type: String,
      default: '',
    },
  },
  created() {
    /*
      If options is an array, render the list using that array.
      else convert the options Object into an array by mapping over key values.
      This can be done to avoid running a find on selectedLabel computation.
    */
    eventBus.$on('focusChanged', this.closeOnFocusChange);
    eventBus.$on('onKeyDown', this.handleKeyDown);
  },
  destroyed() {
    eventBus.$off('focusChanged', this.closeOnFocusChange);
  },
  methods: {
    isEnterKey(event) {
      return (event.key === ENTER || event.which === 13 || event.code === ENTER);
    },
    isArrowKey(e) {
      return ([ARROW_DOWN, ARROW_UP]
        .indexOf(e.key || e.code) > -1 || [38, 40].indexOf(e.which) > -1);
    },
    isArrowKeyUp(event) {
      return ([ARROW_UP].indexOf(event.key || event.code) > -1 || [38].indexOf(event.which) > -1);
    },
    handleKeyDown(e) {
      if (e.target.closest('.flock-select') === this.$el) {
        if (this.isEnterKey(e)) {
          e.preventDefault();
          if (this.selectOpen) {
            this.onChange(this.options[this.focusIndex]);
          }
          this.toggle();
        }
        if (this.isArrowKey(e)) {
          e.preventDefault();
          if (this.selectOpen) {
            this.focusIndex += (this.isArrowKeyUp(e) ? -1 : 1);
            this.focusIndex = this.focusIndex % this.options.length;
          } else {
            this.toggle();
          }
        }
      }
    },
    closeOnFocusChange(el) {
      if (this.$el !== el) {
        this.selectOpen = false;
      }
    },
    onChange({ label, value }) {
      this.selectedLabel = label;
      this.$emit('change', value);
    },
    toggle() {
      this.selectOpen = !this.selectOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
.flock-select {
  padding: 10px;
  display: inline-block;
  text-align: left;
  padding-right: 1.75em;
  border-radius: 2px;
  border: solid 1px $border-grey-light;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  white-space: nowrap;
  &:focus {
    border-color: $primary;
    outline: none;
  }
  .label {
    @include ellipsis();
    max-width: 100%;
  }
  span {
    display: inline-block;
    cursor: pointer;
    transition: top 200ms ease-in-out, transform 200ms ease-in-out;
    border: solid transparent;
    content: " ";
    border-color: rgba(105, 113, 120, 0);
    border-top-color: #697178;
    border-width: 6px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-25%);
    .open & {
      top: -2px;
      transform: rotateX(180deg);
    }
  }
  .options {
    list-style: none;
    padding-left: 0;
    position: absolute;
    left: 0;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border: solid 1px #eeeeee;
    min-width: 100%;
    text-align: left;
    z-index: 1;
  }
  .list-item {
    padding: 10px;
    cursor: pointer;
    &.focussed, &:hover {
      background: #f2f2f2;
    }
  }
}
</style>
