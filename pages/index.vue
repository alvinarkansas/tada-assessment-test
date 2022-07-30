<template>
  <NuxtLayout name="default">
    <section class="flex justify-between mb-8">
      <div>
        <h1 class="font-bold text-4xl">Invoices</h1>
        <p>There are {{ invoices.length }} total invoices</p>
      </div>

      <div class="flex gap-4 items-center">
        <div class="relative" :tabindex="0" @blur="dropdownOpen = false">
          <Button
            class="bg-transparent hover:bg-anodyne-100/5"
            @click="dropdownOpen = !dropdownOpen"
          >
            <div class="inline-flex gap-2 items-center">
              <p class="font-semibold">
                {{ screenWidth < 768 ? "Filter" : "Filter by status" }}
              </p>
              <ChevronDownIcon class="w-5 h-5 text-anodyne-500" />
            </div>
          </Button>
          <div
            v-if="dropdownOpen"
            class="
              absolute
              top-16
              inset-x-0
              bg-anodyne-300
              dark:bg-anodyne-600
              rounded-lg
              shadow-lg
              flex flex-col
              gap-4
              p-4
            "
          >
            <button @click="filter = ''">All Status</button>
            <button @click="filter = 'paid'">Paid</button>
            <button @click="filter = 'pending'">Pending</button>
            <button @click="filter = 'draft'">Draft</button>
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
      invoices: [],
      dropdownOpen: false,
      filter: "",
    };
  },
  methods: {
    async loadInvoices() {
      const params = {
        populate: "*",
        sort: "id:desc",
      };
      if (this.filter) {
        params["filters[status][$eq]"] = this.filter;
      }
      const { data } = await this.find("invoices", params);
      this.invoices = data.map(({ attributes, id }) => ({
        id,
        invoice_no: attributes.invoice_no,
        name: attributes.recipient_name,
        due_date: this.$dayjs(attributes.due_date).format("DD MMM YYYY"),
        amount: attributes.amount,
        status: attributes.status,
      }));
    },
    toIndexPage() {
      this.$router.push({ path: "/" });
    },
  },
  computed: {
    screenWidth() {
      return store.computed.screenWidth.get();
    },
    atCreatePage() {
      return this.$route.fullPath === "/create";
    },
  },
  watch: {
    filter() {
      this.loadInvoices();
      this.dropdownOpen = false;
    },
  },
  async mounted() {
    this.loadInvoices();
  },
};
</script>
