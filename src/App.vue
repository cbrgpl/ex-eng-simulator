<script setup lang="ts" >
import { setLanguageAtInit } from './utils/composable/setLanguageAtInit'

setLanguageAtInit()
</script>

<template >
  <v-app >
    <router-view />
  </v-app>
</template>

<style lang="scss" >

</style>
