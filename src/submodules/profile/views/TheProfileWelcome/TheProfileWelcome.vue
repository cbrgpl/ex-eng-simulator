<script setup lang="ts" >
import { useDisplay } from 'vuetify'

import { useProfileStore } from '@/store/profile'

import PGreetingCard from './partials/PGreetingCard.vue'
import PLgSidebar from './partials/PLgSidebar.vue'
import PXsSidebar from './partials/PXsSidebar.vue'

const { lgAndUp } = useDisplay()
const profileStore = useProfileStore()

profileStore.get()
</script>

<template >
  <v-layout
    full-height >
    <p-lg-sidebar
      v-if="lgAndUp" />
    <!-- <p-xs-sidebar /> -->
    <v-main >
      <div class="pa-2 flex-grow-1 overflow-hidden" >
        <p-greeting-card />
      </div>
    </v-main>
  </v-layout>      
</template>

<style scoped lang="scss" >



</style>
