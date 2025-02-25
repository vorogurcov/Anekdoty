<template>
  <div class="relative inline-block text-left">
    <AppButton @click="openClose" class="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
      {{ menuTitle }}
    </AppButton>
    <div
        v-if="isOpen"
        class="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
    >
      <div class="max-h-48 overflow-y-auto">
        <AppButton
            v-for="(element, index) in menuElements"
            :key="index"
            @click="selectElement(element)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
        >
          {{ element }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/interface/components/AppButton.vue";

export default {
  name: "DropDownMenu",
  components: { AppButton },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openClose() {
      this.isOpen = !this.isOpen;
    },
    selectElement(element) {
      this.$emit("select", element);
      this.isOpen = false;
    },
  },
  props: {
    menuTitle: {
      type: String,
      default: "Menu",
    },
    menuElements: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

