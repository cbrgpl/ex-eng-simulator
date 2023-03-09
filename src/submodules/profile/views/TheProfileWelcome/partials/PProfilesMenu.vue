<script setup lang="ts" >
import { ref, Ref, GlobalComponents, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useProfileStore } from '@store/profile'
import { required } from '@validations'

import PProfileItem from './PProfileItem.vue'
import PListItem from './PListItem.vue'

const { t } = useI18n()
const profileTemplate = {
  id: 0,
  name: 'ĐɄ฿฿ⱠɆ ₱ɄⱤ₮ł฿Ʉ₴ɆⱠ',
  creation: 'ØⱤ.₮Ⱡ.Ɇ₲ɆɄ',
  activityTime: 0,
}

const profileStore = useProfileStore()
const { profiles, profilesAreLoading } = storeToRefs( profileStore )

const formLoading = ref( false )
const loading = computed( () => profilesAreLoading.value || formLoading.value )

const profileNameDOM: Ref<GlobalComponents['VTextField'] | null> = ref( null )
const newProfileName = ref( '' )
const createProfile = async () => {
  const errors = await profileNameDOM.value!.validate()

  if ( errors.length !== 0 ) {
    return
  }

  formLoading.value = true
  const createdProfile = await profileStore.create( { name: newProfileName.value } )
  
  if ( createdProfile ) {
    profileStore.activeProfile = createdProfile
  }

  profileNameDOM.value!.reset()
  formLoading.value = false  
}

const focus = () => {
  profileNameDOM.value!.focus()
}

defineExpose( {
  focus,
} )

</script>

<template >
  <v-list class="h-100 overflow-y-auto pt-0" >
    <div class="profiles-menu__form" >
      <v-list-subheader >
        {{ t('Profile.CreateProfile') }}
      </v-list-subheader>

      <p-list-item :profile="profileTemplate" >
        <template
          #name="{ profileName }" >
          <v-text-field
            ref="profileNameDOM"

            v-model="newProfileName"
            :disabled="loading"
          
            variant="underlined"
            prepend-inner-icon="folder-plus"
          
            :rules="[ required ]"

            :label="t('Profile.ProfileName')"
            :placeholder="profileName" />
        </template>

        <template #action >
          <v-btn
            color="success"
            :loading="loading"
            @click="createProfile" >
            {{ t('Common.Create') }}
          </v-btn>
        </template>
      </p-list-item>

      <v-divider />
    </div>


    <v-list-subheader >
      {{ t('Profile.ProfilesList') }}
    </v-list-subheader>
      
 
    <template
      v-for="profile of profiles"
      :key="profile.id" >
      <div >
        <p-profile-item :profile="profile" />
        <v-divider />
      </div>
    </template>
  </v-list>
</template>

<style scoped lang="scss" >
.profiles-menu__form {
  position: sticky;
  top: 0;    
  z-index: 1;
  background: rgb(var(--v-theme-background));
}
</style>
