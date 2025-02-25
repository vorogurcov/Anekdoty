<template>
  <div class="bg-white border border-gray-300 rounded-lg shadow-md p-4 space-y-3">
    <div class="text-lg font-semibold text-gray-900">
      {{ anecdoteText }}
    </div>
    <div class="flex justify-between items-center text-sm text-gray-600">
      <p class="font-medium">ID: {{ id }}</p>
      <p class="italic">{{ rubricName }}</p>
      <p class="font-semibold text-yellow-500">⭐ {{ rating }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnecdoteContainer",
  props: {
    anecdoteText: {
      type: String,
      default: "",
    },
    rubricName: {
      type: String,
      default: "Без рубрики",
    },
    rating: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped></style>
