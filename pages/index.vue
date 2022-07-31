<template>
  <NuxtLayout name="default">
    <section class="flex justify-between mb-8">
      <div>
        <h1 class="font-bold text-4xl">Invoices</h1>
        <p>There are {{ invoices.length }} total invoices</p>
      </div>

      <div class="flex gap-4 items-center">
        <div class="relative" :tabindex="0" v-click-outside="closeDropdown">
          <Button
            class="bg-transparent hover:bg-anodyne-100/5"
            @click="dropdownOpen = !dropdownOpen"
          >
            <div class="inline-flex gap-2 items-center">
              <p class="font-semibold !text-anodyne-800 dark:!text-anodyne-100">
                {{ screenWidth < 768 ? "Filter" : "Filter by status" }}
              </p>
              <ChevronDownIcon class="w-5 h-5 text-anodyne-500" />
            </div>
          </Button>
          <div v-if="dropdownOpen" class="dropdown">
            <button
              :class="{ 'bg-anodyne-200 dark:bg-anodyne-700': filter === '' }"
              @click="filter = ''"
            >
              All Status
            </button>
            <button
              :class="{
                'bg-anodyne-200 dark:bg-anodyne-700': filter === 'paid',
              }"
              @click="filter = 'paid'"
            >
              Paid
            </button>
            <button
              :class="{
                'bg-anodyne-200 dark:bg-anodyne-700': filter === 'pending',
              }"
              @click="filter = 'pending'"
            >
              Pending
            </button>
            <button
              :class="{
                'bg-anodyne-200 dark:bg-anodyne-700': filter === 'draft',
              }"
              @click="filter = 'draft'"
            >
              Draft
            </button>
          </div>
        </div>

        <NuxtLink to="/create">
          <Button>
            <template #icon>
              <PlusCircleIcon class="h-10 w-10 text-anodyne-100" />
            </template>
            {{ screenWidth < 768 ? "New" : "New Invoice" }}
          </Button>
        </NuxtLink>
      </div>
    </section>

    <section class="flex flex-col gap-5" v-if="invoices.length">
      <NuxtLink
        v-for="invoice in invoices"
        :key="invoice.id"
        :to="'/detail/' + invoice.id"
      >
        <InvoiceCard :detail="invoice" />
      </NuxtLink>
    </section>

    <section v-else class="grid gap-5 place-items-center pt-32">
      <MailOpenIcon class="h-12 w-12" />
      <p class="font-bold text-xl">No invoices</p>
      <p>
        Currently there is no {{ filter }} invoice,
        <NuxtLink to="/create" class="underline text-shade-200">
          create one
        </NuxtLink>
      </p>
    </section>

    <template #modal>
      <Modal v-model="atCreatePage" @overlayClick="toIndexPage">
        <NuxtChild />
      </Modal>
    </template>
  </NuxtLayout>
</template>;

<script>
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import store from "@/stores";
import {
  ChevronDownIcon,
  PlusCircleIcon,
  MailOpenIcon,
} from "@heroicons/vue/solid";

export default {
  name: "IndexPage",
  async setup() {
    definePageMeta({ layout: false });
    const { find } = useStrapi4();
    return { find };
  },
  components: {
    Button,
    ChevronDownIcon,
    MailOpenIcon,
    Modal,
    PlusCircleIcon,
  },
  data() {
    return {
      dropdownOpen: false,
      filter: "",
    };
  },
  methods: {
    toIndexPage() {
      this.$router.push({ path: "/" });
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
  },
  computed: {
    screenWidth() {
      return store.computed.screenWidth.get();
    },
    invoices() {
      return store.computed.invoices.get();
    },
    atCreatePage() {
      return this.$route.fullPath === "/create";
    },
  },
  watch: {
    filter(value) {
      store.computed.loadInvoices({ filter: value });
      this.closeDropdown();
    },
  },
  async mounted() {
    store.computed.loadInvoices({});
  },
};
</script>

<style scoped>
.dropdown {
  @apply absolute top-16 inset-x-0;
  @apply bg-anodyne-300 dark:bg-anodyne-600;
  @apply flex flex-col gap-2;
  @apply p-2;
  @apply shadow-lg;
}
.dropdown button {
  @apply hover:bg-anodyne-200 dark:hover:bg-anodyne-700;
  @apply rounded-md;
  @apply p-2;
}
</style>