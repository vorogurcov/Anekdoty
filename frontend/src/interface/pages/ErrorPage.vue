<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
    <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
    <p class="text-xl text-gray-800 mb-6">Oops! Something went wrong.</p>
    <router-link to="/" class="text-blue-500 hover:underline text-lg">
      Go back to Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorPage"
};
</script>