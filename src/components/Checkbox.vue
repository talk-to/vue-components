<template>
  <div :class="[{'form-group': isForm}]">
    <div class="flock-checkbox">
      <input
        :disabled="disabled"
        :id="defaultId"
        v-model="proxy"
        :value="trueValue"
        type="checkbox"
        @change="update"
      />
      <label
        :style="labelStyles"
        :class="[type, {'styled': !!labelStyles }]"
        :for="defaultId"
      >
        <slot>{{ label }}</slot>
        <span>
        </span>
      </label>
    </div>
  </div>
</template>
<script>
import helpers from '../helpers';

const { getRandomId } = helpers;

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      proxy: this.value,
      defaultId: this.id || getRandomId('Checkbox'),
    };
  },
  props: {
    id: String,
    type: {
      type: String,
      default: 'checkbox',
      validator(value) {
        return ['checkbox', 'switch'].indexOf(value) > -1;
      },
    },
    isForm: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [Number, Array, Object, Boolean, String],
      default: true,
    },
    falseValue: {
      type: [Object, Boolean, String],
      default: false,
    },
    label: {
      type: String,
    },
    value: {
      type: [Array, Object, Boolean, String],
      default: false,
    },
    labelStyles: {
      type: Object,
      default() {},
    },
  },
  watch: {
    value() {
      this.proxy = this.value;
    },
  },
  computed: {
    state() {
      let isChecked;
      if (this.proxy instanceof Array) {
        isChecked = this.proxy.indexOf(this.trueValue) > -1;
      } else if (typeof (this.proxy) === 'boolean') {
        isChecked = !!this.proxy;
      }
      if (this.disabled) {
        if (isChecked) {
          return 'checkbox-disabled-active';
        }
        return 'checkbox-disabled';
      }
      if (isChecked) {
        return 'checkbox-active';
      }
      return 'checkbox-default';
    },
  },
  methods: {
    update() {
      this.$emit('change', this.proxy);
    },
  },
};
</script>
<style lang="scss" scoped>

$switchWidth: 48px;
$switchHeight: 16px;
$circleDiameter: 12px;
$gap: 2px;
$checkedCirclePos: $switchWidth - $circleDiameter - $gap;
$offTextPos: $checkedCirclePos - 10px;
.switch-circle {
  background: white;
  width: $circleDiameter;
  height: $circleDiameter;
  border-radius: 50%;
  top: 2px;
  border: none;
  position: absolute;
}
.flock-checkbox {
  text-align: left;
  input[type="checkbox"] {
    position: absolute;
    left: -999999px;
    & + label {
      color: $text-color;
      position: relative;
      font-size: 1rem;
      font-weight: normal;
      line-height: normal;
      z-index: 2;
      padding: 13px 15px 13px 2rem;
      display: block;
      @include ellipsis();
      & > span {
        content: "";
        box-sizing: border-box;
        width: 1rem;
        height: 1rem;
        display: inline-block;
        background-color: white;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border: solid 1px $border-color;
        border-radius: 3px;
        transition: 0.2s background cubic-bezier(0.22, 0.61, 0.36, 1);
      }
      &.switch {
        padding-left: 4rem;
        & > span {
          width: $switchWidth;
          height: $switchHeight;
          border-radius: 12px;
          background: $border-color;
          border: none;
          &:before {
            position: absolute;
            content: 'Off';
            top: 53%;
            transform: translateY(-50%);
            right: 6px;
            color: white;
            font-size: small;
            font-weight: 600;
          }
          &:after {
            transition: 0.2s left cubic-bezier(0.22, 0.61, 0.36, 1);
            content: '';
            left: 3px;
            @extend .switch-circle;
          }
        }
      }
    }
    &:disabled {
      & + label > span {
        background: #F2F2F2;
        border-color: $input-border-color;
      }
      &:checked + label > span {
        background: $input-border-color;
      }
    }
  }
  input[type="checkbox"]:checked + label {
    &.switch {
      & > span {
        &:after {
          left: $checkedCirclePos;
          @extend .switch-circle;
        }
        &:before {
          content: 'On';
          left: 4px;
        }
      }
    }
    &.checkbox > span:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    & > span {
      border: none;
      background: $primary;
      &:after {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        width: 9px;
        height: 4px;
        border: 1px solid #ffffff;
        border-top: none;
        border-right: none;
        background: transparent;
      }
    }
  }
}
</style>
