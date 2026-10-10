<script setup>
import { Gavel } from "lucide-vue-next";
</script>

<template>
  <main class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center items-center gap-2 mb-6">
        <Gavel class="h-10 w-10 text-emerald-600" />
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          Delcom Auction
        </h1>
      </div>
      <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
        <div class="mb-8 grid grid-cols-2 rounded-xl bg-slate-100/80 p-1 text-center text-sm font-semibold">
          <RouterLink to="/auth/login" class="rounded-lg py-2.5 transition-all text-slate-600 hover:text-slate-700" active-class="bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5">Masuk Akun</RouterLink>
          <RouterLink to="/auth/register" class="rounded-lg py-2.5 transition-all text-slate-600 hover:text-slate-700" active-class="bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5">Daftar Baru</RouterLink>
        </div>
        <RouterView />
      </div>
      <p class="mt-8 text-center text-sm text-slate-600">
        &copy; 2026 Pengembangan Aplikasi Web. All rights reserved.
      </p>
    </div>
  </main>
</template>