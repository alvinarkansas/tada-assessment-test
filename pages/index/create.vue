<template>
  <div class="inner-modal-fixed overflow-auto">
    <h1 class="text-2xl font-bold mb-8">Create New Invoice</h1>
    <FormKit id="invoice" type="form" @submit="onSubmit" :actions="false">
      <section class="mb-5">
        <FormKit type="group" name="from">
          <p class="text-base text-shade-100 mb-4">Bill From</p>
          <FormKit
            name="street"
            type="text"
            label="Street Address"
            placeholder="Type address here"
            validation="required"
          />
          <div class="flex gap-5">
            <FormKit
              name="city"
              type="text"
              label="City"
              placeholder="Type city here"
              validation="required"
            />
            <FormKit
              name="zip"
              type="text"
              label="Post Code"
              placeholder="Type post code here"
              validation="required"
            />
            <FormKit
              name="country"
              type="text"
              label="Country"
              placeholder="Type country here"
              validation="required"
            />
          </div>
        </FormKit>
      </section>

      <section class="mb-5">
        <FormKit type="group" name="to">
          <p class="text-base text-shade-100 mb-4">Bill To</p>
          <FormKit
            name="client_name"
            type="text"
            label="Client's Name"
            placeholder="Type client's name here"
            validation="required"
          />
          <FormKit
            name="email"
            type="email"
            label="Client's Email"
            placeholder="Type email here"
            validation="required"
          />
          <FormKit
            name="street"
            type="text"
            label="Street Address"
            placeholder="Type address here"
            validation="required"
          />
          <div class="flex gap-5">
            <FormKit
              name="city"
              type="text"
              label="City"
              placeholder="Type city here"
              validation="required"
            />
            <FormKit
              name="zip"
              type="text"
              label="Post Code"
              placeholder="Type post code here"
              validation="required"
            />
            <FormKit
              name="country"
              type="text"
              label="Country"
              placeholder="Type country here"
              validation="required"
            />
          </div>
        </FormKit>
      </section>

      <section class="mb-8">
        <div class="flex gap-5">
          <FormKit
            name="due_date"
            type="date"
            label="Invoice Date"
            placeholder="Select invoice date"
            validation="required"
            outer-class="flex-1"
          />
          <FormKit
            name="payment_term"
            type="select"
            label="Payment Terms"
            placeholder="Select payment terms"
            outer-class="flex-1"
            validation="required"
            :options="[
              { label: 'Direct', value: 'Direct' },
              { label: 'Next 7 Days', value: 'Next 7 Days' },
              { label: 'Next 30 Days', value: 'Next 30 Days' },
              { label: 'Next 60 Days', value: 'Next 60 Days' },
              { label: 'Next 90 Days', value: 'Next 90 Days' },
            ]"
          />
        </div>

        <FormKit
          name="description"
          type="text"
          label="Project Description"
          placeholder="Type description here"
        />
      </section>

      <section class="mb-8">
        <p class="text-xl font-semibold text-anodyne-400 mb-4">Item List</p>
        <FormKit name="items" v-model="values" type="list">
          <div class="hidden md:flex gap-5 mb-3">
            <p class="flex-[3]">Item Name</p>
            <p class="flex-[1]">Qty</p>
            <p class="flex-[2]">Price</p>
            <p class="flex-[1]">Total</p>
            <div class="flex-[1]" v-if="values.length > 1" />
          </div>
          <FormKit v-for="(item, i) in items" :key="i" name="item" type="group">
            <FormKit
              name="name"
              label="Item Name"
              type="text"
              placeholder="Type item name here"
              outer-class="md:hidden mb-3"
            />
            <div class="flex gap-5 items-center">
              <FormKit
                name="name"
                type="text"
                placeholder="Type item name here"
                outer-class="hidden md:block flex-[3] mb-3"
              />
              <FormKit
                name="qty"
                label="Qty"
                type="number"
                placeholder="Type qty here"
                outer-class="flex-[1] mb-3"
                label-class="md:hidden"
              />
              <FormKit
                name="price"
                label="Price"
                type="number"
                placeholder="Type price here"
                outer-class="flex-[2] mb-3"
                label-class="md:hidden"
              />
              <p
                class="mb-3 font-semibold flex-[1]"
                v-if="values[i].qty && values[i].price"
              >
                <!-- {{ item.qty * item.price }} -->
                {{ values[i].qty * values[i].price }}
              </p>
              <p class="mb-3 font-semibold flex-[1]" v-else>0</p>
              <TrashIcon
                v-if="values.length > 1"
                @click="removeItem(i)"
                class="w-6 h-6 text-anodyne-500 flex-[1] mb-3 cursor-pointer"
              />
            </div>
          </FormKit>
        </FormKit>
        <Button class="bg-anodyne-600 w-full" @click="addItem">
          +Add New
        </Button>
      </section>

      <section class="flex gap-5 justify-end">
        <Button class="bg-anodyne-600" @click="$router.push({ path: '/' })">
          Cancel
        </Button>
        <Button @click="saveAsDraft" class="bg-anodyne-600">
          Save As Draft
        </Button>
        <Button type="submit">Create Invoice</Button>
      </section>
    </FormKit>
  </div>
</template>

<script>
import store from "@/stores";
import { TrashIcon } from "@heroicons/vue/solid";
import Button from "@/components/Button.vue";

export default {
  name: "CreatePage",
  components: {
    Button,
    TrashIcon,
  },
  setup() {
    useHead({ title: "Create" });
    const { create } = useStrapi4();

    const values = ref([]);
    const items = ref([{ name: "", qty: 0, price: 0 }]);

    const addItem = () => {
      items.value.push({ name: "", qty: 0, price: 0 });
    };

    const removeItem = (key) => {
      items.value = items.value.filter((item, index) => index !== key);
    };

    const grandTotal = computed(() => {
      return values.value
        .map((item) => (item.qty || 0) * (item.price || 0))
        .reduce((prev, current) => prev + current, 0);
    });

    return { create, values, items, addItem, removeItem, grandTotal };
  },
  data() {
    return {
      draft: false,
    };
  },
  methods: {
    generateInvoiceNumber() {
      let result = "";
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nums = "0123456789";

      for (var i = 0; i < 2; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      for (var i = 0; i < 4; i++) {
        result += nums.charAt(Math.floor(Math.random() * nums.length));
      }
      return result;
    },
    async onSubmit(value) {
      let itemIds = [];
      for (let item of this.values) {
        const { data } = await this.create("invoice-items", {
          name: item.name,
          qty: +item.qty,
          price: +item.price,
        });
        if (data.id) {
          itemIds.push(data.id);
        }
      }
      const payload = {
        invoice_no: this.generateInvoiceNumber(),
        description: value.description,
        due_date: new Date(value.due_date).toISOString(),
        payment_term: value.payment_term,
        sender_city: value.from.city,
        sender_country: value.from.country,
        sender_street: value.from.street,
        sender_zip: value.from.zip,
        recipient_city: value.to.city,
        recipient_country: value.to.country,
        recipient_street: value.to.street,
        recipient_zip: value.to.zip,
        recipient_name: value.to.client_name,
        recipient_email: value.to.email,
        status: this.draft ? "draft" : "pending",
        amount: this.grandTotal,
        invoice_items: itemIds,
      };

      await this.create("invoices", payload);

      store.computed.loadInvoices({});

      this.$router.push({ path: "/" });
    },
    saveAsDraft() {
      this.draft = true;
      setTimeout(() => {
        this.$formkit.submit("invoice");
      }, 100);
    },
  },
};
</script>