<template>
  <div class="hello">
    <Loader :loading="loading" :fullPage="true" loaderText="Connecting...">
      <hr>
      <div>
        <h2>Dropdown component</h2>
        <div class="dropdowns">
          <div class="left-align">
            <h3>Left Align (Without beak)</h3>
            <Dropdown
              :open="dropdownOpen"
              align="left"
              width="120%"
            >
              <div slot="text">Display Label</div>
              <div>
                This content will be displayed.
              </div>
            </Dropdown>
          </div>
          <div class="middle-align">
            <h3>Middle Align</h3>
            <Dropdown
              beakSize="6px"
              :open="dropdownOpen"
            >
              <div slot="text">Display Label</div>
              <div>
                This content will be displayed.
              </div>
            </Dropdown>
          </div>
          <div class="right-align">
            <h3>Right Align</h3>
            <Dropdown
              :open="dropdownOpen"
              align="right"
              width="120%"
            >
              <div slot="text">Display Label</div>
              <div>
                This content will be displayed.
              </div>
            </Dropdown>
          </div>
          <div class="left-align">
            <h3>Dropdown List</h3>
            <Select
              :options="listOptions"
              v-model="selectedOption"
            />
            <Select
              width="150px"
              :options="listOptions"
              v-model="selectedOption2"
            />
          </div>
        </div>
      </div>
      <hr>
      <h2>
        Button Components:
      </h2>
      <div class="component-container">
        <div
          class="buttons"
          :key="index"
          v-for="(button, index) in buttonTypes">
          <label for="">{{button.type}} {{ !!button.invert ? '(Inverted)' : '' }}:</label>
          <label :for="`disabler-${index}`">
            <input
              :id="`disabler-${index}`"
              type="checkbox"
              v-model="button.disabled"
            />
            Disabled
          </label>
          <Button
            :disabled="button.disabled"
            :invert="!!button.invert"
            :type="button.type">
            {{button.type}}
          </Button>
        </div>
      </div>
      <div class="full-width">
        <Button
          size="full"
          :loading="loading"
          @click="showLoader"
        >
          Show Loader
        </Button>
      </div>
      <div style="margin-top: 1em;">
        Small Sized Button:
        <Button size="auto" shape="flat" :small="true">
          Click Me!
        </Button>
      </div>
      <hr>
      <h2>
        Radio Input Components:
      </h2>
      <div class="container">
        <div class="elem">
          Radio Input Value: <b>{{ radio }}</b>
          <radio
            label="Is this the value!"
            v-model="radio"
            optionValue="Yes"
          >
          </radio>
          <radio
            label="Or is this the value!"
            v-model="radio"
            optionValue="No"
          >
          </radio>
        </div>
        <div class="elem">
          Radio: <b>{{ disabledSelectedRadio }}</b>
          <radio
            label="Disabled Selected"
            v-model="disabledSelectedRadio"
            optionValue="Disabled & Selected"
            :disabled="true"
          >
          </radio>
          <radio
            label="Disabled unselected"
            v-model="disabledSelectedRadio"
            optionValue="Can be anything."
            :disabled="true"
          >
          </radio>
        </div>
      </div>
      <hr>
      <h2>Checkbox Component</h2>
      <div class="container">
        <div class="elem">
          <checkbox
            v-model="checkbox"
            id="checkbox"
          >
            Selected Checkbox
          </checkbox>
          {{ checkbox }}
        </div>
        <div class="elem">
          <checkbox
            type="switch"
            v-model="checkbox"
            id="checkbox"
          >
            Switch Styled
          </checkbox>
          {{ checkbox }}
        </div>
        <div class="elem">
          <checkbox
            v-model="disabledSelectedCheckbox"
            :disabled="true"
            id="disabledSelectedCheckbox"
          >
            Disabled Selected Checkbox
          </checkbox>
          {{ disabledSelectedCheckbox }}
        </div>
        <div class="elem">
          <checkbox
            v-model="disabledSelectedCheckbox"
            :disabled="true"
            type="switch"
          >
            Switch Styled
          </checkbox>
          {{ disabledSelectedCheckbox }}
        </div>

        <div class="elem">
          <checkbox
            v-model="disabledCheckbox"
            :disabled="true"
            id="disabledCheckbox"
          >
            Disabled Checkbox
          </checkbox>
          {{ disabledCheckbox }}
        </div>
        <div class="elem">
          <checkbox
            v-model="disabledCheckbox"
            :disabled="true"
            type="switch"
          >
            Disabled Checkbox
          </checkbox>
          {{ disabledCheckbox }}
        </div>

        <div class="elem">
          <checkbox
            v-model="arrayCheckbox"
            trueValue="hello"
          >
            Hello
          </checkbox>
          <checkbox
            v-model="arrayCheckbox"
            trueValue="goodbye"
          >
            Goodbye
          </checkbox>
          <checkbox
            v-model="arrayCheckbox"
            trueValue="toodles"
          >
            Toodles
          </checkbox>
          Chosen greetings: {{ arrayCheckbox }}
        </div>
      </div>
      <hr>
      <h2>Banners & Toasts</h2>
      <div class="content">
        Toggle Banner position:
        {{ position }}
        <Button
          @click="togglePosition"
        >
          Toggle
        </Button>
        <banner
          :position="position"
        >
          This is a banner!
        </banner>
      </div>
      <div class="content">
        Show Toast:
        <Button @click="showToast = !showToast">
          Show Toast
        </Button>
        <Toast
          :styles="toastStyles"
          v-if="showToast"
          position="top"
          @toasthidden="showToast = false"
        >
          This is a styled toast!
        </Toast>
      </div>
      <h2>Links</h2>
      This link will show the toast:
      <FlockLink @click="showToast = !showToast">Show Toast</FlockLink>
      <h2>Modal</h2>
      <Button @click="showModal = !showModal">Toggle Modal</Button>
      <Modal @close="showModal = false" v-if="showModal" title="Settings">
        List of devices!
      </Modal>
    </Loader>
  </div>
</template>

<script>
import {
  Banner,
  Button,
  Checkbox,
  Dropdown,
  Loader,
  Modal,
  Radio,
  Select,
  Link,
  Toast,
} from './index';

export default {
  name: 'Demo',
  components: {
    Banner,
    Button,
    Checkbox,
    Dropdown,
    Loader,
    Modal,
    Radio,
    Select,
    FlockLink: Link,
    Toast,
  },
  data: () => ({
    radio: 'No',
    position: 'top',
    showToast: false,
    selectedOption: 'unsubscribe',
    selectedOption2: 'subscribe',
    loading: false,
    disabledSelectedRadio: 'Disabled & Selected',
    checkbox: true,
    disabledCheckbox: false,
    disabledSelectedCheckbox: true,
    dropdownOpen: false,
    showModal: false,
    toastStyles: {
      backgroundColor: '#333333',
      color: 'white',
    },
    listOptions: [{
      label: 'Subscribe',
      value: 'subscribe',
    }, {
      label: 'Unsubscribe',
      value: 'unsubscribe',
    }],
    arrayCheckbox: ['toodles'],
    buttonTypes: [
      {
        type: 'primary',
        disabled: false,
      },
      {
        type: 'secondary',
        disabled: false,
      },
      {
        type: 'destructive',
        disabled: false,
      },
      {
        type: 'primary',
        disabled: false,
        invert: true,
      },
      {
        type: 'secondary',
        disabled: false,
        invert: true,
      },
      {
        type: 'destructive',
        disabled: false,
        invert: true,
      },
    ],
  }),
  methods: {
    togglePosition() {
      if (this.position === 'top') {
        this.position = 'bottom';
      } else {
        this.position = 'top';
      }
    },
    showLoader() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
  },
};
</script>

<style scoped lang="scss">
$break-small: 480px;
$break-large: 1024px;
@mixin respond-to($media) {
  @if $media==mobile {
    @media only screen and (max-width: $break-small) {
      @content;
    }
  }
  @else if $media == medium-screens {
    @media only screen and (min-width: $break-small + 1) and (max-width: $break-large - 1) {
      @content;
    }
  }
  @else if $media==wide-screens {
    @media only screen and (min-width: $break-small + 1) {
      @content;
    }
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.buttons {
  label {
    text-transform: capitalize;
    margin-right: 12px;
  }
}
.dropdowns {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.component-container {
  margin-top: 1em;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 70px 70px;
  @include respond-to(mobile) {
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    .buttons {
      margin-bottom: 12px;
    }
  }
  @include respond-to(medium-screens) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 70px 70px 70px;
  }
}
.container {
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
