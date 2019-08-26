<template>
  <div
    class="dropdown"
    tabindex="1"
    ref="dropdown"
    :class="[{ 'show-beak': showBeak }, { open: dropdownOpen }]"
    @click="check($event)"
  >
    <div class="header">
      <div class="text">
        <slot name="text"></slot>
      </div>
      <span v-if="showDropdownBeak"></span>
    </div>
    <transition name="fade">
      <div
        class="content"
        v-if="dropdownOpen"
        :style="styles"
        :class="align"
      >
        <slot></slot>
      </div>
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
    return {
      dropdownOpen: this.open,
    };
  },
  props: {
    beakSize: {
      type: String,
      default: '4px',
    },
    showDropdownBeak: {
      type: Boolean,
      default: true,
    },
    showBeak: {
      type: Boolean,
      default: true,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    open: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'middle', 'left', 'right'].indexOf(value) > -1;
      },
    },
  },
  created() {
    eventBus.$on('focusChanged', this.closeOnFocusChange);
    eventBus.$on('onKeyDown', this.handleKeyDown);
  },
  destroyed() {
    eventBus.$off('focusChanged', this.closeOnFocusChange);
  },
  watch: {
    open(value) {
      this.dropdownOpen = value;
    },
  },
  methods: {
    closeOnFocusChange(focusEl) {
      let isDropdownContent = false;
      if (focusEl.parentNode) {
        // Figure out if the clicked element is the content of the dropdown in concern
        isDropdownContent = focusEl.closest('.dropdown') === this.$el;
      } else if (this.dropdownOpen) {
        // Close all other dropdowns
        this.toggle();
      }
      // If clicked element is not the dropdown content and dropdown is open then close it.
      if (!isDropdownContent && this.dropdownOpen) {
        this.toggle();
      }
    },
    isEnterKey(event) {
      return (event.key === ENTER || event.which === 13 || event.code === ENTER);
    },
    isArrowKey(event) {
      return ([ARROW_DOWN, ARROW_UP]
        .indexOf(event.key || event.code) > -1 || [38, 40].indexOf(event.which) > -1);
    },
    handleKeyDown(e) {
      if (e.target.closest('.dropdown') === this.$el && (this.isEnterKey(e) || this.isArrowKey(e))) {
        e.preventDefault();
        this.toggle();
      }
    },
    isChildTarget(e) {
      return !!(e && e.target.closest('.content'));
    },
    check(e) {
      if (!this.dropdownOpen || !this.isChildTarget(e)) {
        this.toggle();
      }
    },
    toggle() {
      this.dropdownOpen = !this.dropdownOpen;
      this.$emit('stateChanged', this.dropdownOpen);
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  user-select: none;
  position: relative;
  display: inline-block;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
  &:focus .text {
    outline: $primary auto 2px;
  }
}
.text {
  display: inline-block;
}
.content {
  @include borderRadius();
  @include boxShadow();
  margin-bottom: 20px;
  z-index: 1;
  margin-top: 12px;
  background-color: #ffffff;
  border: solid 1px #eeeeee;
  position: absolute;
  width: 100%;
  left: 0;
  &.middle {
    left: 50%;
    transform: translateX(-50%);
    &:after, &:before {
      left: 50%;
    }
  }
  &.left {
    &:after, &:before {
      left: 15px;
    }
  }
  &.right {
    right: -22%;
    &:before, &:after {
      right: 15px;
    }
  }
  &:after, &:before {
    bottom: 100%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 7px;
    margin-left: -4px;
  }
  &:before {
    border-color: rgba(238, 238, 238, 0);
    border-bottom-color: #eeeeee;
    border-width: 8px;
    margin-left: -5px;
  }
  .show-beak & {
    &:before, &:after {
      content: " ";
    }
  }
}
.header {
  cursor: pointer;
  position: relative;
  span {
    display: inline-block;
    cursor: pointer;
    transition: top 200ms ease-in-out, transform 200ms ease-in-out;
    border: solid transparent;
    content: " ";
    border-color: rgba(105, 113, 120, 0);
    border-top-color: #697178;
    border-width: 6px;
    position: relative;
    right: -10px;
    top: 4px;
    .open & {
      top: -2px;
      transform: rotateX(180deg);
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
