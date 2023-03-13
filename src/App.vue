<script setup lang="ts" >
import { setLanguageAtInit } from './utils/composable/setLanguageAtInit'
import { localStorageManager } from '@modules/LocalStorageManager'

setLanguageAtInit()
const searchStorageLimit = async () => {
  console.log( 'Найдено значение! ', await localStorageManager.searchStorageLimit() )
}
</script>

<template >
  <v-app >
    <v-btn
      color="success"
      @click="searchStorageLimit" >
      text
    </v-btn>
    <router-view />
  </v-app>
</template>

<style lang="scss" >

</style>
