<script setup lang="ts" >
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

import { useProfileStore } from '@/store/profile'

import LayoutProfile from '@mprofile/layouts/LayoutProfile/LayoutProfile.vue'
import ZStorageCard from '@mprofile/components/ZStorageCard/ZStorageCard.vue'

import PLgSidebar from './partials/PLgSidebar.vue'
import PXsSidebar from './partials/PXsSidebar.vue'
import PGreetingCard from './partials/PGreetingCard.vue'
import PProfilesMenu from './partials/PProfilesMenu.vue'

const { lgAndUp } = useDisplay()
const isXsSidebarVisible = ref( false )

const profileMenu = ref<InstanceType<typeof PProfilesMenu> | null>( null ) 

const focusCreateProfile = () => {
  if ( !lgAndUp.value ) {
    isXsSidebarVisible.value = true
  }

  const sidebarAppearenceTime = 120
  setTimeout( () => profileMenu.value!.focus(), sidebarAppearenceTime )
}

const profileStore = useProfileStore()
profileStore.get()
</script>

<template >
  <layout-profile class="py-2" >
    <template #app-bar-prepend >
      <v-app-bar-nav-icon
        icon="menu"
        @click="isXsSidebarVisible = !isXsSidebarVisible " />
    </template>
    <template #layout >
      <p-lg-sidebar v-if="lgAndUp" >
        <p-profiles-menu ref="profileMenu" />
      </p-lg-sidebar>
      <p-xs-sidebar
        v-else
        v-model="isXsSidebarVisible" >
        <p-profiles-menu ref="profileMenu" />
      </p-xs-sidebar>
    </template>
    <div class="profile-welcome__content" >
      <p-greeting-card
        elevation="4"
        @focusProfile="focusCreateProfile" />
      <z-storage-card elevation="4" />
    </div>
  </layout-profile>
</template>

<style scoped lang="scss" >
.profile-welcome__content {
  display: grid;
  gap: rem(8px);
}


</style>
