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
        <template v-if="!loading">
          <span class="text-anodyne-500">#</span>
          {{ detail?.invoice_no }}
        </template>
        <div
          v-else
          class="
            h-10
            w-24
            rounded-lg
            bg-anodyne-300
            dark:bg-anodyne-500
            animate-pulse
          "
        />
      </h1>
      <div class="flex items-center gap-4">
        <NuxtLink :to="'/detail/' + $route.params.id + '/edit'">
          <Button :disabled="loading" class="hidden md:flex bg-anodyne-500">
            Edit
          </Button>
        </NuxtLink>
        <Button
          :disabled="loading"
          loadingLabel="Deleting..."
          @click="deleteInvoice"
          class="hidden md:flex bg-error-200"
        >
          Delete
        </Button>
        <Button
          :disabled="loading"
          loadingLabel="Updating..."
          @click="markAsPaid"
          v-if="detail?.status !== 'paid'"
        >
          Mark as Paid
        </Button>
      </div>
    </header>

    <section class="flex flex-col gap-8 mb-8">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-y-8 grid-flow-dense">
        <div>
          <p class="mb-2">Project Description</p>
          <p v-if="!loading" class="font-semibold text-lg leading-6">
            {{ detail?.description }}
          </p>
          <div
            v-else
            class="
              h-5
              w-28
              rounded-md
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>

        <div>
          <p class="mb-2">Payment Status</p>
          <Badge v-if="!loading" :variant="detail?.status" class="capitalize">
            {{ detail?.status }}
          </Badge>
          <div
            v-else
            class="
              h-10
              w-24
              rounded-lg
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>

        <div class="font-semibold md:font-normal md:text-right">
          <p class="mb-2 font-normal md:hidden">Bill Address</p>
          <template v-if="!loading">
            <p>{{ detail?.recipient_street }}</p>
            <p>{{ detail?.recipient_city }}</p>
            <p>{{ detail?.recipient_zip }}</p>
            <p>{{ detail?.recipient_country }}</p>
          </template>
          <template v-else>
            <div
              class="
                h-5
                w-36
                rounded-md
                bg-anodyne-300
                dark:bg-anodyne-500
                animate-pulse
                mb-2
              "
            />
            <div
              class="
                h-5
                w-44
                rounded-md
                bg-anodyne-300
                dark:bg-anodyne-500
                animate-pulse
                mb-2
              "
            />
            <div
              class="
                h-5
                w-36
                rounded-md
                bg-anodyne-300
                dark:bg-anodyne-500
                animate-pulse
                mb-2
              "
            />
            <div
              class="
                h-5
                w-32
                rounded-md
                bg-anodyne-300
                dark:bg-anodyne-500
                animate-pulse
              "
            />
          </template>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4">
        <div>
          <p class="mb-2">Client</p>
          <p v-if="!loading" class="font-semibold text-lg leading-6">
            {{ detail?.recipient_name }}
          </p>
          <div
            v-else
            class="
              h-5
              w-28
              rounded-md
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>

        <div>
          <p class="mb-2">Due Date</p>
          <p v-if="!loading" class="font-semibold text-lg leading-6">
            {{ $dayjs(detail?.due_date).format("DD MMM YYYY") }}
          </p>
          <div
            v-else
            class="
              h-5
              w-28
              rounded-md
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>

        <div>
          <p class="mb-2">Payment Terms</p>
          <p v-if="!loading" class="font-semibold text-lg leading-6">
            {{ detail?.payment_term }}
          </p>
          <div
            v-else
            class="
              h-5
              w-28
              rounded-md
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>

        <div>
          <p class="mb-2">Sent To</p>
          <p v-if="!loading" class="font-semibold text-lg leading-6">
            {{ detail?.recipient_email }}
          </p>
          <div
            v-else
            class="
              h-5
              w-28
              rounded-md
              bg-anodyne-300
              dark:bg-anodyne-500
              animate-pulse
            "
          />
        </div>
      </div>

      <div>
        <p class="text-lg">Items</p>
        <span class=""></span>
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
                <template v-if="detail?.invoice_items?.data.length">
                  <tr
                    v-for="item in detail?.invoice_items?.data"
                    :key="item.id"
                  >
                    <td class="py-4 px-6">{{ item.attributes.name }}</td>
                    <td class="py-4 px-6 text-center">
                      {{ item.attributes.qty }}
                    </td>
                    <td class="py-4 px-6 text-right">
                      {{ $currency(item.attributes.price) }}
                    </td>
                    <td class="py-4 px-6 text-right">
                      {{
                        $currency(item.attributes.qty * item.attributes.price)
                      }}
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td class="py-4 px-6">No items</td>
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
            <p v-if="!loading">{{ $currency(detail?.amount) }}</p>
            <div
              v-else
              class="
                h-5
                w-28
                rounded-md
                bg-anodyne-300
                dark:bg-anodyne-500
                animate-pulse
              "
            />
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4 md:hidden">
      <NuxtLink :to="'/detail/' + $route.params.id + '/edit'">
        <Button :disabled="loading" class="bg-anodyne-500 w-full">Edit</Button>
      </NuxtLink>
      <Button @click="deleteInvoice" class="bg-error-200">Delete</Button>
    </section>

    <template #modal>
      <Modal v-model="atEditPage" @overlayClick="toDetailPage">
        <NuxtChild :detail="detail" @refetch="loadInvoiceDetail" />
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
    useHead({ title: "Detail" });
    definePageMeta({ layout: false });
    const { findOne, delete: _delete, update } = useStrapi4();
    return { findOne, _delete, update };
  },
  data() {
    return {
      detail: {},
      loading: true,
    };
  },
  components: {
    Button,
    ChevronLeftIcon,
    Modal,
  },
  methods: {
    async loadInvoiceDetail() {
      this.loading = true;
      const { data } = await this.findOne("invoices", this.$route.params.id, {
        populate: "*",
      });
      this.detail = data.attributes;
      this.loading = false;
    },
    toDetailPage() {
      this.$router.push({ path: "/detail/" + this.$route.params.id });
    },
    async deleteInvoice() {
      await this._delete("invoices", this.$route.params.id);
      for (let item of this.detail?.invoice_items?.data) {
        await this._delete("invoice-items", item.id);
      }
      this.$router.push({ path: "/" });
    },
    async markAsPaid() {
      await this.update("invoices", this.$route.params.id, {
        status: "paid",
      });
      this.loadInvoiceDetail();
    },
  },
  computed: {
    atEditPage() {
      return (
        this.$route.fullPath === "/detail/" + this.$route.params.id + "/edit"
      );
    },
  },
  mounted() {
    this.loadInvoiceDetail();
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