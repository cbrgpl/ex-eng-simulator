<script setup lang="ts" >
import { setLanguageAtInit } from './utils/composable/setLanguageAtInit'
import { localStorageManager } from '@modules/localStorageManager'

setLanguageAtInit()
localStorageManager.init()
</script>

<template >
  <v-app >
    <router-view />
  </v-app>
</template>

<style lang="scss" >

</style>
