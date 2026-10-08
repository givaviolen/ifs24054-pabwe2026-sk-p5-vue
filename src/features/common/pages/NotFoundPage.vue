<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900">404</h1>
      <p class="mt-4 text-xl text-gray-600">Halaman tidak ditemukan.</p>
      <RouterLink to="/" class="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        Kembali ke Beranda
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
