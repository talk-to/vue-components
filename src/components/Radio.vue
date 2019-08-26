<template>
  <div class="radio">
    <label :for="defaultId" :style="labelStyles">
      <input
        :id="defaultId"
        :name="name"
        :disabled="disabled"
        :value="optionValue"
        :checked="isChecked"
        type="radio"
        @change="update($event)">
      <slot><span>{{ label }}</span></slot>
    </label>
  </div>
</template>
<script>
import helpers from '../helpers';

const { getRandomId } = helpers;
export default {
  data() {
    return {
      defaultId: this.id || getRandomId('Radio'),
    };
  },
  props: {
    name: String,
    label: String,
    optionValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    value: [String, Number, Boolean],
    disabled: {
      type: Boolean,
      default: false,
    },
    labelStyles: {
      type: Object,
      default() {},
    },
  },
  methods: {
    update() {
      this.$emit('input', this.optionValue);
    },
  },
  computed: {
    isChecked() {
      return this.optionValue === this.value;
    },
  },
};
</script>
<style lang="scss" scoped>

@mixin maxWidth($maxWidth: 100%) {
  max-width: $maxWidth;
  box-sizing: border-box;
}
$radioDiameter: 16px;
label {
  display: block;
  padding: 14px 15px 15px 2em;
  position: relative;
  font-weight: normal;
  color: $text-color;
  z-index: 1;
  line-height: 14px;
  text-align: left;
  @include ellipsis();
  input {
    position: absolute;
    left: -99999px;
    &:disabled ~ span {
      color: $light-text-color;
    }
    &:checked {
      & ~ span:after {
        position: absolute;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background: $primary;
        content: '';
        left: 3px;
        top: 17px;
        top: 48%;
        transform: translateY(-50%);
      }
      &:disabled {
        & ~ span:after {
          background: $input-border-color;
        }
        & ~ span:before {
          border-color: $input-border-color;
        }
      }
    }
  }
  & > span {
    font-size: 0.875rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      border-radius: 50%;
      box-sizing: border-box;
      width: $radioDiameter;
      height: $radioDiameter;
      border: solid 1px $border-color;
      top: 48%;
      transform: translateY(-50%);
    }
  }
}
</style>
