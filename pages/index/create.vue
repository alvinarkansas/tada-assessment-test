<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Create New Invoice</h1>
    <FormKit type="form" @submit="create" :actions="false">
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
            name="invoice_date"
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
        <FormKit name="items" v-model="items" type="list">
          <div class="flex gap-5 mb-3">
            <p class="flex-[3]">Item Name</p>
            <p class="flex-[1]">Qty</p>
            <p class="flex-[2]">Price</p>
            <p class="flex-[1]">Total</p>
            <div class="flex-[1]" />
          </div>
          <FormKit v-for="(item, i) in items" :key="i" name="item" type="group">
            <div class="flex gap-5 items-center">
              <FormKit
                name="name"
                type="text"
                placeholder="Type item name here"
                outer-class="flex-[3] mb-3"
              />
              <FormKit
                name="qty"
                type="number"
                placeholder="Type qty here"
                outer-class="flex-[1] mb-3"
              />
              <FormKit
                name="price"
                type="number"
                placeholder="Type price here"
                outer-class="flex-[2] mb-3"
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
        <Button class="bg-anodyne-600" @click="$router.push({ path: '/' })">
          Cancel
        </Button>
        <Button type="submit"> Create Invoice </Button>
      </section>
    </FormKit>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/solid";
import Button from "@/components/Button.vue";

export default {
  name: "CreatePage",
  components: {
    Button,
    TrashIcon,
  },
  data() {
    return {
      from: {},
      to: {},
      items: [{}],
    };
  },
  methods: {
    removeItem(index) {
      const filtered = [...this.items].filter((item, idx) => {
        return idx !== index;
      });
      this.items = filtered;
    },
    create(value) {
      console.log("Submit", value);
    },
  },
};
</script>