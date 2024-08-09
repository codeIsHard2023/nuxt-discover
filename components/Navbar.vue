<template>
  <nav px6 py4 border="b base" flex="~ gap2 items-center" text-xl>
    <NuxtLink to="https://nuxt.com/docs" target="_blank" p2 rounded hover="bg-active">
      <div i-logos-nuxt-icon></div>
    </NuxtLink>
    <span>learning.nuxt.with.
      <NuxtLink to="https://www.youtube.com/watch?v=49WXr6kVBVI&list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax&index=6"
        hover:underline>
        antfu
      </NuxtLink>
    </span>
    <div flex-auto />
    <NuxtLink to="https://github.com/codeIsHard2023/nuxt-discover" target="_blank" p2 rounded hover="bg-active">
      <div i-carbon-logo-github />
    </NuxtLink>
  </nav>
</template>
