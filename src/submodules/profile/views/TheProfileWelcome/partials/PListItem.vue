<script setup lang="ts" >
import { useI18n } from 'vue-i18n'

import { IProfile } from '@api'

const { t } = useI18n()

defineProps<{
  profile: IProfile,
  active?: boolean
}>()

</script>

<template >
  <v-list-item
    class="bg-blue-grey-lighten-5 pb-3" >  
    <div class="d-flex" >
      <div class="flex-grow-1 list-item__header-wrapper" >
        <div class="mb-2" >
          <slot
            name="name"
            :profile-name="profile.name" >
            <v-list-item-title :class="{'text-secondary': active}" >
              {{ profile.id + 1 }}. {{ profile.name }}
            </v-list-item-title>
          </slot>
        </div>
        <v-list-item-subtitle class="text-placeholder text-decoration-underline" >
          {{ t('Common.From') }} {{ profile.creation.slice(0, 10) }}
        </v-list-item-subtitle>
      </div>
      <v-avatar
        size="large"
        class="text-h4 bg-primary align-self-center ms-4" >
        {{ profile.name.slice(0, 1).toUpperCase() }}
      </v-avatar>
    </div>


    <v-list-item-action class="list-item__actions" >
      <v-scroll-y-transition >
        <span
          v-show="active"
          class="text-secondary align-self-lg-center mr-auto" >
          {{ t('Profile.IsProfileActive') }}
        </span>
      </v-scroll-y-transition>
      <div class="list-item__buttons-container" >
        <slot name="action" />
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<style scoped lang="scss" >
@import '~vuetify';

.list-item__header-wrapper {
  margin-bottom: map-get($spacers, 2);
}

.list-item__actions {
  justify-content: flex-end;
  align-items: stretch;
  margin-top: map-get($spacers, 4); 
}

.list-item__buttons-container {
  width: rem(128px);
}

:slotted(.list-item__button) {
  height: rem(36px) !important;
}

@media screen and (min-width: map-get($grid-breakpoints, 'lg')) {
  .list-item__buttons-container {
    width: auto;
  }

  :slotted(.list-item__button) {
    height: auto;
  }
}

</style>
