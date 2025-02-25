<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">MyApp</div>
      <div class="flex space-x-4">
        <router-link to="/" class="hover:text-gray-300 transition">Home</router-link>
        <router-link to="/login" class="hover:text-gray-300 transition">Login</router-link>
        <router-link to="/register" class="hover:text-gray-300 transition">Register</router-link>
        <router-link to="/main" class="hover:text-gray-300 transition">Main</router-link>
      </div>
    </nav>
  </header>
</template>
