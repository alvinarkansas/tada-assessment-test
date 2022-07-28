<template>
  <NuxtLayout>
    <div class="text-anodyne-600 dark:text-anodyne-100 dark:bg-anodyne-600">
      <Navbar />
      <main class="mt-16 md:mt-0 md:ml-16 dark:bg-anodyne-600">
        <div>
          <NuxtPage />
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>

<style>
main {
  min-height: calc(100vh - 4rem);
  @apply md:min-h-screen;
}
main > div {
  @apply p-6 md:py-24;
  @apply md:max-w-3xl md:mx-auto;
}
</style>