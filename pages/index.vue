<script setup lang="ts">
const colorMode = useColorMode();

const toggleColor = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const iconChange = computed(() => {
  return colorMode.value === "dark"
    ? "i-ic-baseline-mode-night"
    : "i-ic-baseline-light-mode";
});
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full ">
    <div border="~ r base p4">
      Content
      <div text-color flex="~ gap2 items-center">
        <span>Change color mode</span>
        <button @click="toggleColor">
          <div :class="iconChange" />
        </button>
      </div>
    </div>
    <ThePlayground />
  </div>
</template>
