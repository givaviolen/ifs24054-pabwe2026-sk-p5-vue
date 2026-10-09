<script setup>
import { useRouter, RouterLink } from "vue-router";
import { Gavel, LogOut, LayoutDashboard, Users, UserCog, Menu } from "lucide-vue-next";
import { useAuthStore } from "../../auth/states/authStore";
import { useUsersStore } from "../../users/states/usersStore";
import { photoUrl, showConfirmDialog } from "../../../helpers/toolsHelper";
import { ref } from 'vue'

const auth = useAuthStore();
const users = useUsersStore();
const router = useRouter();

const mobileMenuOpen = ref(false)

const emit = defineEmits(["toggle"])

async function logout() {
  if (!(await showConfirmDialog("Kamu akan keluar dari akun ini."))) return;
  await auth.asyncLogout();
  router.push("/auth/login");
}

const navItems = [
  { to: "/", label: "Beranda Lelang", icon: LayoutDashboard },
  { to: "/?tab=mine", label: "Lelang Saya", icon: Gavel },
  { to: "/users", label: "Pengguna", icon: Users },
  { to: "/profile", label: "Profil", icon: UserCog },
];
</script>

<template>
  <header class="bg-emerald-800 shadow-md sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-white tracking-wide">
            <Gavel class="h-6 w-6 text-emerald-300" /> 
            <span>Delcom <span class="font-light">Auction</span></span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <RouterLink
            v-for="item in navItems" :key="item.to" :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-emerald-100 hover:bg-emerald-700 hover:text-white transition-colors"
            active-class="bg-emerald-900 text-white"
            exact-active-class="bg-emerald-900 text-white"
          >
            <component :is="item.icon" class="h-4 w-4" /> {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Profile & Logout -->
        <div class="hidden md:flex items-center gap-4">
          <div v-if="users.profile" class="flex items-center gap-3 pl-4 border-l border-emerald-600">
            <div class="text-right">
              <p class="text-sm font-semibold text-white leading-none">{{ users.profile.name }}</p>
              <p class="text-xs text-emerald-300 mt-1">{{ users.profile.email }}</p>
            </div>
            <img :src="photoUrl(users.profile.photo)" alt="Foto" class="h-9 w-9 rounded-full ring-2 ring-emerald-500 object-cover" />
          </div>
          <button @click="logout" class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-900 hover:bg-red-700 hover:text-white rounded-md transition-all">
            <LogOut class="h-4 w-4" /> Keluar
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="flex items-center md:hidden">
          <button aria-label="Menu" @click="mobileMenuOpen = !mobileMenuOpen; $emit('toggle')" class="text-emerald-100 hover:text-white p-2">
            <Menu class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-emerald-900 border-t border-emerald-700">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white"
          @click="mobileMenuOpen = false"
        >
          <component :is="item.icon" class="h-5 w-5" /> {{ item.label }}
        </RouterLink>
        <button @click="logout" class="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-300 hover:bg-red-900/50 hover:text-red-100">
          <LogOut class="h-5 w-5" /> Keluar
        </button>
      </div>
    </div>
  </header>
</template>