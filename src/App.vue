<template>
  <div id="app">
    <Select :options="listOptions" />
  </div>
</template>

<script>
import { Select } from './index';

export default {
  name: 'app',
  components: {
    Select,
  },
  data() {
    return {
      listOptions: [
        {
          label: 'Subscribe',
          value: 'subscribe',
        },
        {
          label: 'Unsubscribe',
          value: 'unsubscribe',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
