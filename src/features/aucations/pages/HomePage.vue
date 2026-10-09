<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Plus, Search, Trash2, Clock } from "lucide-vue-next";
import AddModal from "../modals/AddModal.vue";
import { useAucationsStore } from "../states/aucationsStore";
import { countdownText, formatRupiah, highestBid, isClosed, showConfirmDialog } from "../../../helpers/toolsHelper";

const store = useAucationsStore();
const route = useRoute();
const router = useRouter();
const tabs = [
  { key: "all", label: "Semua Lelang" },
  { key: "mine", label: "Lelang Saya" },
  { key: "open", label: "Lelang Berlangsung" },
  { key: "closed", label: "Lelang Ditutup" },
];
const tab = computed(() => route.query.tab || "all");
const search = ref("");
const showAdd = ref(false);
const now = ref(Date.now());
const timer = setInterval(() => (now.value = Date.now()), 1000);
onBeforeUnmount(() => clearInterval(timer));

const load = () => store.asyncGetAucations(tab.value === "mine" ? { is_me: 1 } : {});
watch(tab, load, { immediate: true });

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return store.aucations.filter((a) => {
    const matches = !q || a.title.toLowerCase().includes(q) || (a.description || "").toLowerCase().includes(q);
    const closed = isClosed(a, now.value);
    const byTab = tab.value === "open" ? !closed : tab.value === "closed" ? closed : true;
    return matches && byTab;
  });
});

const setTab = (key) => router.push({ path: "/", query: key === "all" ? {} : { tab: key } });

async function deleteAll() {
  if (await showConfirmDialog("Seluruh lelang milikmu akan dihapus permanen.")) {
    if (await store.asyncDeleteAllAucations()) load();
  }
}
</script>

<template>
  <section class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Eksplorasi Lelang</h1>
        <p class="text-slate-600 mt-1">Temukan penawaran terbaik dan ikuti lelang impianmu.</p>
      </div>
      <div class="flex gap-3">
        <button v-if="tab === 'mine'" class="btn-danger shadow-md shadow-rose-500/20" @click="deleteAll">
          <Trash2 class="h-4 w-4" /> Hapus Semua
        </button>
        <button class="btn-primary shadow-md shadow-emerald-500/20" @click="showAdd = true">
          <Plus class="h-4 w-4" /> Lelang Baru
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex flex-wrap gap-2 w-full sm:w-auto p-1 bg-slate-200/50 rounded-xl">
        <button
          v-for="t in tabs" :key="t.key" class="rounded-lg px-5 py-2 text-sm font-semibold transition-all"
          :class="tab === t.key ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'"
          @click="setTab(t.key)"
        >{{ t.label }}</button>
      </div>

      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        <input v-model="search" class="input pl-10 py-2.5 text-base rounded-xl" placeholder="Ketik judul..." aria-label="Cari lelang" />
      </div>
    </div>

    <div v-if="store.isAucation" class="flex justify-center py-12">
      <div class="flex flex-col items-center gap-4" role="status">
        <div class="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-slate-600 font-medium">Memuat data lelang...</p>
      </div>
    </div>
    
    <div v-else-if="!filtered.length" class="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-slate-100 border-dashed">
      <div class="bg-slate-100 p-4 rounded-full mb-4">
        <Search class="h-8 w-8 text-slate-400" />
      </div>
      <h3 class="text-lg font-bold text-slate-700">Tidak Ada Lelang</h3>
      <p class="text-slate-600 mt-1 max-w-sm text-center">Belum ada lelang yang sesuai dengan kriteria yang dipilih saat ini.</p>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article v-for="a in filtered" :key="a.id" class="group bg-white flex flex-col overflow-hidden rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
        <div class="h-48 bg-slate-100 relative overflow-hidden">
          <img v-if="a.cover" :src="a.cover" :alt="a.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div v-else class="h-full w-full flex items-center justify-center text-slate-600">
            Tanpa Gambar
          </div>
          <!-- Status Badge overlapping image -->
          <div class="absolute top-3 right-3">
            <span class="rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md"
              :class="isClosed(a, now) ? 'bg-slate-900/70 text-white' : 'bg-emerald-700 text-white'">
              {{ isClosed(a, now) ? "Berakhir" : "Live" }}
            </span>
          </div>
        </div>
        
        <div class="flex flex-1 flex-col p-5">
          <h2 class="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">{{ a.title }}</h2>
          <p class="text-sm text-slate-600 mt-1">oleh <span class="font-medium text-slate-700">{{ a.author?.name }}</span></p>
          
          <div class="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-600">Harga Buka</span>
              <span class="font-medium text-slate-700">{{ formatRupiah(a.start_bid) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-600 text-sm">Penawaran</span>
              <span class="font-bold text-emerald-700 text-lg">{{ formatRupiah(highestBid(a)) }}</span>
            </div>
          </div>
          
          <div class="mt-5 mb-4 flex items-center gap-2 text-sm font-semibold p-2.5 rounded-lg" :class="isClosed(a, now) ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'">
            <Clock class="h-4 w-4" /> 
            <span>{{ countdownText(a.closed_at, now) }}</span>
          </div>
          
          <RouterLink :to="`/aucations/${a.id}`" class="mt-auto block text-center w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Lihat Rincian
          </RouterLink>
        </div>
      </article>
    </div>

    <AddModal :show="showAdd" @close="showAdd = false" @added="load" />
  </section>
</template>