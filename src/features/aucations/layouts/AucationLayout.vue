<script setup>
import { onMounted, ref } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import { useUsersStore } from "../../users/states/usersStore";

const open = ref(false);
const users = useUsersStore();
onMounted(() => users.asyncGetProfile());
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <NavbarComponent />
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
