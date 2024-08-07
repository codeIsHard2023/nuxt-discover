<template>
  <nav px6 py4 border="b base" flex="~ gap2 items-center" text-xl>
    <NuxtLink
      p2
      rounded
      hover="bg-active"
      href="https://nuxt.com/docs"
      target="_blank"
      ><div i-logos-nuxt-icon></div
    ></NuxtLink>
    <span>learning.nuxt.with.antfu</span>
    <div flex-auto />
    <NuxtLink
      p2
      rounded
      hover="bg-active"
      href="https://github.com/codeIsHard2023/nuxt-discover"
      target="_blank"
      ><div i-carbon-logo-github />
    </NuxtLink>
  </nav>
</template>
