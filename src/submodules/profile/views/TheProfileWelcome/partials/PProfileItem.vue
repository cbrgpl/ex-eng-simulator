<script setup lang="ts" >
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { IProfile } from '@api'
import { useProfileStore } from '@store/profile'

import PListItem from './PListItem.vue'

const props = defineProps<{
  profile: IProfile
}>()

const { t } = useI18n()  

const profileStore = useProfileStore()
const { activeProfile } = storeToRefs( profileStore )

const loading = ref( false )
const isActive = computed( () => activeProfile.value?.id === props.profile.id )

const activateProfile = () => {
  if ( activeProfile.value && activeProfile.value.id === props.profile.id ) {
    return
  }

  profileStore.activeProfile = props.profile
}

const removeProfile = async () => {
  loading.value = true
  await profileStore.delete( props.profile.id )
  loading.value = false
}

</script>

<template >
  <p-list-item
    :profile="profile"
    :active="isActive" >
    <template #action >
      <v-btn
        min-width="36px"
        width="36px"
        height="auto"
        rounded="default"

        color="error"
        
        :title="t('Common.Delete')"
        
        :loading="loading"
        @click="removeProfile" >
        <template #default >
          <v-icon
            icon="delete"
            size="x-large" />
        </template>
      </v-btn>
             
      <v-btn
        class="ml-1"
          
        min-width="36px"
        width="36px"
        height="100%"
        rounded="default"

        color="primary"

        :title="t('Common.Activate')"
        :disabled="isActive"
        :loading="loading"
        @click="activateProfile" >
        <template #default >
          <v-icon
            icon="account-box-multiple"
            size="x-large" />
        </template>
      </v-btn>
    </template>
  </p-list-item>
</template>

<style scoped lang="scss" >
  
</style>
