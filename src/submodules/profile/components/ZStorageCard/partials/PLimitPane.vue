<script setup lang="ts" >
import { ref, GlobalComponents } from 'vue'
import { useI18n } from 'vue-i18n'

import { required, numeric } from '@validations'
import { localStorageManager } from '@modules/localStorageManager'

const { t } = useI18n()

const userLimit = ref<number | null>( null )
const $userLimit = ref<GlobalComponents['VTextField'] | null>( null )
const onSetLimitSubmition = async () => {
  const errors = await $userLimit.value!.validate()
  if ( errors.length !==  0 ) {
    return
  }

  const newLimitInBytes = Number( ( userLimit.value as number * 1024 ).toFixed( 0 ) )
  localStorageManager.setStorageLimit( newLimitInBytes )
  
  userLimit.value = 0
  $userLimit.value!.reset()
}

</script>

<template >
  <v-card >
    <v-container >
      <v-row >
        <v-col sm="6" >
          <v-card variant="text" >
            <v-card-subtitle >
              {{ t('Profile.CurrentLimit', { limit: localStorageManager.storageLimit }) }}
            </v-card-subtitle>
            <v-card-text >
              <v-text-field
                ref="$userLimit"
                
                v-model.number="userLimit"
                :rules="[ required, numeric ]"
                
                class="mb-2"
                variant="underlined"
                placeholder="15360"
                suffix="KB" />
              <v-btn
                @click="onSetLimitSubmition" >
                {{ t('Common.Submit') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped lang="scss" >
  
</style>
