<script setup lang="ts" >
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useProfileStore } from '@store/profile'

import ZLanguageSwitcher from '@/components/ZLanguageSwitcher.vue'

const { t } = useI18n()
const { lgAndUp, smAndUp } = useDisplay()
const profileStore = useProfileStore()

const smActionsBarVisible = ref( false )

const { activeProfile } = storeToRefs( profileStore )
</script>

<template >
  <v-layout
    id="layout-profile"
    full-height >
    <v-app-bar
      density="default"
      class="overflow-visible"
      color="primary-lighten-1" >
      <template
        v-if="!lgAndUp"
        #prepend >
        <slot name="app-bar-prepend" />
      </template>


      <template #append >
        <v-card
          v-if="activeProfile"
          class="layout-profile__active-profile"
          density="compact"
          variant="text" >
          <v-card-title class="pt-0 text-right" >
            {{ activeProfile.id }}. {{ activeProfile.name }}
          </v-card-title>
          <v-card-subtitle class="text-right" >
            {{ t('Common.From') }} {{ activeProfile.creation.slice(0, 10) }}
          </v-card-subtitle>
        </v-card>
        <z-language-switcher v-if="smAndUp" />
        <v-btn
          v-if="!smAndUp"
          rounded
          icon="arrow-expand-down"
          @click="smActionsBarVisible = !smActionsBarVisible" />
      </template>
    </v-app-bar>
    <v-app-bar
      v-if="!smAndUp"
      v-model="smActionsBarVisible"
      class="px-3 overflow-visible"  
      absolute
      
      color="primary-darken-1"
      flat
      density="compact" >
      <z-language-switcher />
    </v-app-bar>

    <slot name="layout" />
    
    <v-main >
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped lang="scss" >
@import '~vuetify';

@media screen and (max-width: calc(map-get($grid-breakpoints, 'md') - 1px)) {
  .layout-profile__active-profile {
    max-width: rem(200px);
  }
}
</style>
