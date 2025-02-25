<template>
  <div>
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/interface/components/HeaderComponent.vue';
import FooterComponent from '@/interface/components/FooterComponent.vue';

export default {
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>

