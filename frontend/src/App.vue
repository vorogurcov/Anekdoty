<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    DefaultLayout,
    BlankLayout
  },
  data() {
    return {
      route: useRoute()
    };
  },
  computed: {
    layout() {
      return this.route.meta.layout || 'DefaultLayout';
    }
  }
};
</script>