<template>
  <NuxtLayout name="default">
    <Button
      transparent
      class="bg-transparent mb-8"
      @click="$router.push({ path: '/' })"
    >
      <template #icon>
        <ChevronLeftIcon class="h-6 w-6" />
      </template>
      Back
    </Button>

    <header class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold">
        <span class="text-anodyne-500">#</span>XM9141
      </h1>
      <div class="flex items-center gap-4">
        <NuxtLink to="/detail/edit">
          <Button class="hidden md:flex bg-anodyne-500">Edit</Button>
        </NuxtLink>
        <Button class="hidden md:flex bg-error-200">Delete</Button>
        <Button>Mark as Paid</Button>
      </div>
    </header>

    <section class="flex flex-col gap-8 mb-8">
      <div class="grid grid-cols-2">
        <div>
          <p class="mb-2">Project Description</p>
          <p class="font-semibold text-lg leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            nostrum eveniet quisquam, saepe ratione omnis accusantium vero
            incidunt.
          </p>
        </div>

        <div class="text-right">
          <p>19 Union Terrace</p>
          <p>London</p>
          <p>EI192</p>
          <p>United Kingdom</p>
        </div>
      </div>

      <div class="grid md:grid-cols-4">
        <div>
          <p class="mb-2">Client</p>
          <p class="font-semibold text-lg leading-6">Alex Grim</p>
        </div>

        <div>
          <p class="mb-2">Due Date</p>
          <p class="font-semibold text-lg leading-6">21 Aug 2021</p>
        </div>

        <div>
          <p class="mb-2">Payment Terms</p>
          <p class="font-semibold text-lg leading-6">Next 30 Days</p>
        </div>

        <div>
          <p class="mb-2">Sent To</p>
          <p class="font-semibold text-lg leading-6">alexgrim@gmail.com</p>
        </div>
      </div>

      <div>
        <p class="text-lg">Items</p>
        <div class="overflow-x-auto overflow-y-hidden rounded-lg divide-y-2">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-anodyne-200 dark:bg-anodyne-600">
              <thead class="whitespace-nowrap min-w-full">
                <tr>
                  <th class="py-4 px-6 text-anodyne-500 font-normal text-left">
                    Item Name
                  </th>
                  <th
                    class="py-4 px-6 text-anodyne-500 font-normal text-center"
                  >
                    QTY
                  </th>
                  <th class="py-4 px-6 text-anodyne-500 font-normal text-right">
                    Price
                  </th>
                  <th class="py-4 px-6 text-anodyne-500 font-normal text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody class="font-semibold">
                <tr>
                  <td class="py-4 px-6">Item 1</td>
                  <td class="py-4 px-6 text-center">20</td>
                  <td class="py-4 px-6 text-right">{{ $currency(90000) }}</td>
                  <td class="py-4 px-6 text-right">{{ $currency(1800000) }}</td>
                </tr>
                <tr>
                  <td class="py-4 px-6">Item 2</td>
                  <td class="py-4 px-6 text-center">5</td>
                  <td class="py-4 px-6 text-right">{{ $currency(10000) }}</td>
                  <td class="py-4 px-6 text-right">{{ $currency(500000) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="
              flex
              justify-between
              py-8
              px-6
              text-anodyne-100
              bg-anodyne-500
              dark:bg-anodyne-800
              text-2xl
              font-semibold
            "
          >
            <p>Total</p>
            <p>{{ $currency(269900) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4 md:hidden">
      <NuxtLink to="/detail/edit">
        <Button class="bg-anodyne-500">Edit</Button>
      </NuxtLink>
      <Button class="bg-error-200">Delete</Button>
    </section>

    <template #modal>
      <Modal v-model="atEditPage" @overlayClick="toDetailPage">
        <NuxtChild />
      </Modal>
    </template>
  </NuxtLayout>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "DetailPage",
  setup() {
    definePageMeta({ layout: false });
  },
  components: {
    Button,
    ChevronLeftIcon,
    Modal,
  },
  methods: {
    toDetailPage() {
      this.$router.push({ path: "/detail" });
    },
  },
  mounted() {
    console.log("Detail Page");
  },
  computed: {
    atEditPage() {
      return this.$route.fullPath === "/detail/edit";
    },
  },
};
</script>

<style scoped>
header,
section {
  @apply p-8;
  @apply rounded-lg;
  @apply bg-anodyne-100 dark:bg-anodyne-700;
}

table {
  border-collapse: collapse;
}
</style>