export default defineNuxtPlugin(() => {
  return {
    provide: {
      currency: (amount: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 2,
        }).format(amount);
      },
    },
  };
});
