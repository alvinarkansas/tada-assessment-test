<template>
  <section class="flex justify-between mb-8">
    <div>
      <h1 class="font-bold text-2xl">Invoices</h1>
      <p>{{ invoices.length }} invoices</p>
    </div>

    <div class="flex gap-4 items-center">
      <p>Filter</p>
      <Button>
        <template #icon>
          <PlusCircleIcon class="h-10 w-10 text-anodyne-100" />
        </template>
        {{ screenWidth < 768 ? "New" : "New Invoice" }}
      </Button>
    </div>
  </section>

  <section class="flex flex-col gap-5">
    <InvoiceCard
      v-for="invoice in invoices"
      :key="invoice.id"
      :detail="invoice"
    />
  </section>
</template>;

<script>
import Button from "@/components/Button.vue";
import store from "@/stores";
import { PlusCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "IndexPage",
  components: {
    Button,
    PlusCircleIcon,
  },
  data() {
    return {
      invoices: [
        {
          id: "RT3080",
          name: "Jensen Huang",
          due_date: "19 Aug 2021",
          amount: 1800.9,
          status: "paid",
        },
        {
          id: "XM9141",
          name: "Alex Grim",
          due_date: "20 Sep 2021",
          amount: 556,
          status: "pending",
        },
        {
          id: "RG0314",
          name: "John Morrison",
          due_date: "01 Oct 2021",
          amount: 14002.33,
          status: "paid",
        },
        {
          id: "RT2080",
          name: "Alysa Werner",
          due_date: "12 Oct 2021",
          amount: 102.04,
          status: "pending",
        },
        {
          id: "AA1449",
          name: "Mellisa Clarke",
          due_date: "14 Oct 2021",
          amount: 4032.33,
          status: "pending",
        },
      ],
    };
  },
  computed: {
    screenWidth() {
      return store.computed.screenWidth.get();
    },
  },
};
</script>
