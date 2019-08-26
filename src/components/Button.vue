<template>
  <button
    class="btn"
    :disabled="disabled"
    :style="styles"
    :class="[type, size, shape, { invert, small }]"
    @click="$emit('click', $event)">
    <slot>Submit</slot>
    <LoaderSVG
      v-if="loading"
      class="loader"
    />
  </button>
</template>
<script>
import LoaderSVG from '../assets/loader-green.svg';

export default {
  components: {
    LoaderSVG,
  },
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
    shape: {
      type: String,
      default: 'default',
      validator(prop) {
        return ['default', 'flat'].indexOf(prop) > -1;
      },
    },
    small: {
      type: Boolean,
      default: false,
    },
    size: {
      default: 'auto',
      type: String,
      validator(prop) {
        return ['auto', 'full', 'half'].indexOf(prop) > -1;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      default: 'primary',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    invert: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin onHover($color) {
  box-shadow: inset 0 -3px 0 0 $color;
}
.btn {
  @include borderRadius();
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  min-width: 72px;
  font-weight: 600;
  padding: 0.825rem 0.75rem;
  text-align: center;
  text-transform: capitalize;
  transition: all 0.1s ease-in-out;
  background: $primary;
  outline: none;
  position: relative;
  .loader {
    position: absolute;
    left: 1em;
    height: 32px;
    width: 32px;
    top: 50%;
    transform: translateY(-50%);
  }
  &.full {
    width: 100%;
  }
  &.small {
    padding: 0.5rem;
    font-weight: normal;
  }
  &.primary {
    &:active {
      background: $primary-dark;
    }
    &:not(.flat):hover {
      @include onHover($primary-dark);
    }
    &.invert {
      color: $primary;
      &:active {
        color: white;
      }
    }
  }
  &.secondary {
    color: $dark-text-color;
    background: $secondary;
    &:active {
      background: $secondary-dark;
      color: white;
    }
    &:not(.flat):hover {
      @include onHover($secondary-dark);
    }
    &:disabled {
      color: white;
      opacity: 0.7;
    }
    &.invert {
      border-color: $secondary-dark;
    }
  }
  &.destructive {
    background: $destructive;
    &:active {
      background: $destructive-dark;
    }
    &:not(.flat):hover {
      @include onHover($destructive-dark);
    }
    &.invert {
      color: $destructive;
      border-color: $destructive;
      &:active {
        color: white;
      }
    }
  }
  &.invert {
    background: white;
    border: solid 1px $primary;
    &:disabled {
      background: white;
      border-color: $secondary;
      color: $secondary;
      opacity: 1;
    }
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
    &:not(.flat):hover {
      box-shadow: none;
    }
  }
}
</style>
