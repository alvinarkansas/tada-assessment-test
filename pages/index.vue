<template>
  <NuxtLayout name="default">
    <section class="flex justify-between mb-8">
      <div>
        <h1 class="font-bold text-4xl">Invoices</h1>
        <p>There are {{ invoices.length }} total invoices</p>
      </div>

      <div class="flex gap-4 items-center">
        <p>Filter</p>
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

    <section class="flex flex-col gap-5">
      <NuxtLink v-for="invoice in invoices" :key="invoice.id" to="/detail">
        <InvoiceCard :detail="invoice" />
      </NuxtLink>
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
import { PlusCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "IndexPage",
  async setup() {
    definePageMeta({ layout: false });
    const { find } = useStrapi4();
    return { find };
  },
  components: {
    Button,
    Modal,
    PlusCircleIcon,
  },
  data() {
    return {
      invoices: [],
    };
  },
  methods: {
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
  async mounted() {
    const { data } = await this.find("invoices", {
      populate: "*",
      sort: "id:desc",
    });
    this.invoices = data.map(({ attributes }) => ({
      id: attributes.invoice_no,
      name: attributes.recipient_name,
      due_date: this.$dayjs(attributes.due_date).format("DD MMM YYYY"),
      amount: attributes.amount,
      status: attributes.status,
    }));
  },
};
</script>
