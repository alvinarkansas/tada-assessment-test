import { defineStore, mapStores, mapWritableState, mapActions } from "pinia";
import dayjs from "dayjs";

const useStore = defineStore("store", {
  state: () => {
    return {
      screenWidth: 0,
      invoices: [],
      invoicesLoading: true,
    };
  },
  actions: {
    setScreenWidth(value) {
      this.screenWidth = value;
    },
    async loadInvoices({ filter = "" }) {
      this.invoicesLoading = true;
      const { find } = useStrapi4();
      const params = {
        populate: "*",
        sort: "id:desc",
      };
      if (filter) {
        params["filters[status][$eq]"] = filter;
      }
      const { data } = await find("invoices", params);
      this.invoices = data.map(({ attributes, id }) => ({
        id,
        invoice_no: attributes.invoice_no,
        name: attributes.recipient_name,
        due_date: dayjs(attributes.due_date).format("DD MMM YYYY"),
        amount: attributes.amount,
        status: attributes.status,
      }));
      this.invoicesLoading = false;
    },
  },
});

export default {
  computed: {
    ...mapStores(useStore),
    ...mapWritableState(useStore, [
      "screenWidth",
      "invoices",
      "invoicesLoading",
    ]),
    ...mapActions(useStore, ["setScreenWidth", "loadInvoices"]),
  },
};
