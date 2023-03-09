<script setup lang="ts" >
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useProfileStore } from '@store/profile'

const { t } = useI18n()
const { lgAndUp } = useDisplay()
const profileStore = useProfileStore()

const { activeProfile } = storeToRefs( profileStore )
</script>

<template >
  <v-layout
    id="layout-profile"
    full-height >
    <v-app-bar
      density="default"
      color="primary-lighten-1" >
      <template
        v-if="!lgAndUp"
        #prepend >
        <slot name="app-bar-prepend" />
      </template>

      <template #append >
        <v-card
          v-if="activeProfile"
          density="compact"
          variant="text" >
          <v-card-title class="pt-0" >
            {{ activeProfile.id }}. {{ activeProfile.name }}
          </v-card-title>
          <v-card-subtitle > {{ t('Common.From') }} {{ activeProfile.creation }} </v-card-subtitle>
        </v-card>
      </template>
    </v-app-bar>

    <slot name="layout" />

    <v-main >
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped lang="scss" >
  
</style>
