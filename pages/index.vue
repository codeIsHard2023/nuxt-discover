<script setup lang="ts">
const { x, y } = useMouse();
const colorMode = useColorMode();

function toggleColor() {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
<template>
  <div class="text-red light:text-black">
    Hello dear nuxt {{ x }}, {{ y }}
    <h1 class="">Switch to another color mode</h1>
    <button @click="toggleColor">
      {{ colorMode.value }}
    </button>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>
