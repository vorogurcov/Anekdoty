<template>
  <button
      :type="type"
      class="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition active:scale-95"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>


































