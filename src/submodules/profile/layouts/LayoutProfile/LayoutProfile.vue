<script setup lang="ts" >
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useProfileStore } from '@store/profile'

import PStorageWidget from './partials/PStorageWidget.vue'
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
      class="profile-layout__header"
      color="primary-lighten-1" >
      <template
        v-if="!lgAndUp"
        #prepend >
        <slot name="app-bar-prepend" />
      </template>

      <p-storage-widget
        v-if="smAndUp"
        class="mr-auto" />      


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
      class="px-6 overflow-visible"  
      absolute
      
      color="primary-darken-1"
      flat >
      <z-language-switcher />
      <p-storage-widget class="ml-auto" />      
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

@media screen and (min-width: map-get($grid-breakpoints, 'sm')) {
  :deep(.profile-layout__header) {
    overflow: visible;
    padding-inline-start: rem(10px);
    padding-inline-end: rem(10px) !important;

    & .v-toolbar__prepend {
      margin-inline-start: 0 !important;
    }

    & .v-toolbar__append {
      margin-inline-end: 0 !important;
    }
  }
}
</style>
