import { defineStore, mapStores, mapWritableState, mapActions } from "pinia";

const useStore = defineStore("screen", {
  state: () => {
    return { screenWidth: 0 };
  },
  actions: {
    setScreenWidth(value) {
      this.screenWidth = value;
    },
  },
});

export default {
  computed: {
    ...mapStores(useStore),
    ...mapWritableState(useStore, ["screenWidth"]),
    ...mapActions(useStore, ["setScreenWidth"]),
  },
};
