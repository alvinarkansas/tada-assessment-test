<template>
  <div class="inner-modal-fixed overflow-auto">
    <h1 class="text-2xl font-bold mb-8">Edit #{{ detail?.invoice_no }}</h1>
    <FormKit type="form" @submit="onSubmit" :actions="false">
      <section class="mb-5">
        <FormKit type="group" name="from">
          <p class="text-base text-shade-100 mb-4">Bill From</p>
          <FormKit
            id="sender_street"
            name="street"
            type="text"
            label="Street Address"
            placeholder="Type address here"
            validation="required"
          />
          <div class="flex gap-5">
            <FormKit
              id="sender_city"
              name="city"
              type="text"
              label="City"
              placeholder="Type city here"
              validation="required"
            />
            <FormKit
              id="sender_zip"
              name="zip"
              type="text"
              label="Post Code"
              placeholder="Type post code here"
              validation="required"
            />
            <FormKit
              id="sender_country"
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
            id="recipient_name"
            name="client_name"
            type="text"
            label="Client's Name"
            placeholder="Type client's name here"
            validation="required"
          />
          <FormKit
            id="recipient_email"
            name="email"
            type="email"
            label="Client's Email"
            placeholder="Type email here"
            validation="required"
          />
          <FormKit
            id="recipient_street"
            name="street"
            type="text"
            label="Street Address"
            placeholder="Type address here"
            validation="required"
          />
          <div class="flex gap-5">
            <FormKit
              id="recipient_city"
              name="city"
              type="text"
              label="City"
              placeholder="Type city here"
              validation="required"
            />
            <FormKit
              id="recipient_zip"
              name="zip"
              type="text"
              label="Post Code"
              placeholder="Type post code here"
              validation="required"
            />
            <FormKit
              id="recipient_country"
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
            id="due_date"
            name="due_date"
            type="date"
            label="Invoice Date"
            placeholder="Select invoice date"
            validation="required"
            outer-class="flex-1"
          />
          <FormKit
            id="payment_term"
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
          id="description"
          name="description"
          type="text"
          label="Project Description"
          placeholder="Type description here"
        />
      </section>

      <section class="mb-8">
        <p class="text-xl font-semibold text-anodyne-400 mb-4">Item List</p>
        <FormKit name="items" v-model="items" type="list">
          <div class="hidden md:flex gap-5 mb-3">
            <p class="flex-[3]">Item Name</p>
            <p class="flex-[1]">Qty</p>
            <p class="flex-[2]">Price</p>
            <p class="flex-[1]">Total</p>
            <div class="flex-[1]" />
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
                v-if="item.qty && item.price"
              >
                {{ item.qty * item.price }}
              </p>
              <p class="mb-3 font-semibold flex-[1]" v-else>0</p>
              <TrashIcon
                @click="removeItem(i)"
                class="w-6 h-6 text-anodyne-500 flex-[1] mb-3 cursor-pointer"
              />
            </div>
          </FormKit>
        </FormKit>
        <Button class="bg-anodyne-600 w-full" @click="items.push({})">
          +Add New
        </Button>
      </section>

      <section class="flex gap-5 justify-end">
        <Button
          class="bg-anodyne-600"
          @click="$router.push({ path: '/detail/' + $route.params.id })"
        >
          Cancel
        </Button>
        <Button type="submit"> Save Changes </Button>
      </section>
    </FormKit>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/solid";
import Button from "@/components/Button.vue";

export default {
  name: "EditPage",
  components: {
    Button,
    TrashIcon,
  },
  props: ["detail"],
  setup() {
    useHead({ title: "Edit" });
    const { update, create, delete: _delete } = useStrapi4();
    return { update, create, _delete };
  },
  data() {
    return {
      items: [{}],
      deletedIds: [],
    };
  },
  methods: {
    removeItem(index) {
      const filtered = [...this.items].filter((item, idx) => {
        return idx !== index;
      });
      this.items = filtered;
    },
    async onSubmit(value) {
      console.log("Submit", value);
      let itemIds = [];
      for (let item of this.items) {
        if (item.id) {
          const { data } = await this.update("invoice-items", item.id, {
            name: item.name,
            qty: item.qty,
            price: item.price,
          });
          if (data.id) {
            itemIds.push(data.id);
          }
        } else {
          const { data } = await this.create("invoice-items", {
            name: item.name,
            qty: item.qty,
            price: item.price,
          });
          if (data.id) {
            itemIds.push(data.id);
          }
        }
      }
      // if (this.deletedIds.length) {
      //   for (let id of this.deletedIds) {
      //     await this._delete("invoice-items", id);
      //   }
      // }
      const payload = {
        description: value.description,
        due_date: this.$dayjs(value.due_date).toISOString(),
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
        amount: this.grandTotal,
        invoice_items: itemIds,
      };

      console.log("👾 Transformed Payload", payload);
      await this.update("invoices", this.$route.params.id, payload);
      console.log("--- Edit Success ---");
      this.$emit("refetch");
      this.$router.push({ path: "/detail/" + this.$route.params.id });
    },
  },
  computed: {
    grandTotal() {
      return this.items
        .map((item) => (+item.qty || 0) * (+item.price || 0))
        .reduce((prev, current) => prev + current, 0);
    },
  },
  mounted() {
    this.$formkit.get("sender_street")?.input(this.detail.sender_street);
    this.$formkit.get("sender_city")?.input(this.detail.sender_city);
    this.$formkit.get("sender_zip")?.input(this.detail.sender_zip);
    this.$formkit.get("sender_country")?.input(this.detail.sender_country);

    this.$formkit.get("recipient_street")?.input(this.detail.recipient_street);
    this.$formkit.get("recipient_city")?.input(this.detail.recipient_city);
    this.$formkit.get("recipient_zip")?.input(this.detail.recipient_zip);
    this.$formkit
      .get("recipient_country")
      ?.input(this.detail.recipient_country);
    this.$formkit.get("recipient_name")?.input(this.detail.recipient_name);
    this.$formkit.get("recipient_email")?.input(this.detail.recipient_email);

    const formatted = this.$dayjs(this.detail?.due_date).format("YYYY-MM-DD");
    this.$formkit.get("due_date")?.input(formatted);
    this.$formkit.get("description")?.input(this.detail.description);
    this.$formkit.get("payment_term")?.input(this.detail.payment_term);

    this.items = this.detail.invoice_items.data.map(({ id, attributes }) => ({
      id,
      name: attributes.name,
      qty: attributes.qty,
      price: attributes.price,
    }));
  },
};
</script>