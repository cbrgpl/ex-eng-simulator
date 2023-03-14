<script setup lang="ts" >
import { ref, computed } from 'vue'
import { localStorageManager } from '@modules/localStorageManager'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const helpButtonVisible = ref( false )
const usedSpacePercent = computed( () => {
  if ( localStorageManager.storageLimit.value === null ) {
    return 0
  } 

  return ( localStorageManager.usedSpace.value / localStorageManager.storageLimit.value ) * 100
} )
const spaceDetails = computed( () => {
  if ( localStorageManager.storageLimit.value === null ) {
    return ''
  }

  return `${ ( localStorageManager.usedSpace.value / 1024 ).toFixed( 2 ) }KB / ${ ( localStorageManager.storageLimit.value / 1024 ).toFixed( 2 ) }KB`
} ) 

const snackbarVisible = ref( false )
</script>

<template >
  <v-card
    class="storage-widget"
    variant="text" >
    <v-card-title class="storage-widget__space-details" >
      {{ spaceDetails }}
    </v-card-title>
    <div class="storage-widget__circular-wrapper" >
      <v-progress-circular
        color="orange"
        :model-value="usedSpacePercent"
        :size="50"
        :width="12"
        @click="helpButtonVisible = !helpButtonVisible" />

      <v-fade-transition >
        <v-btn
          v-if="helpButtonVisible"
          width="32px"
          min-width="24px"
          height="32px"
          class="storage-widget__help"
          @click="snackbarVisible = !(helpButtonVisible = false)" >
          <v-icon
            icon="help-circle"
            size="32px" />
        </v-btn>
      </v-fade-transition>
    </div>

    <v-snackbar
      v-model="snackbarVisible"
      class="storage-widget__snackbar"
      multi-line
      timeout="10000"
      location="top"
      close-on-content-click >
      {{ t('Profile.StorageWidgetHelpText') }}
    </v-snackbar>
  </v-card>
</template>

<style scoped lang="scss" >
@import '~vuetify';

.storage-widget {
  display: flex;
  overflow: visible;
}

.storage-widget__space-details {
  padding: 0;
  padding-right: map-get($spacers, 2);
  font-size: rem(14px);
  font-family: monospace;
  line-height: 1 !important;
}

.storage-widget__circular-wrapper {
  position: relative;
  cursor: pointer;
}

.storage-widget__help {
  position: absolute;
  bottom: rem(10px);
  left: rem(-10px);
  border-radius: 100%;
  transform: translate(-50%, 50%);
}

.fade-transition-enter-active {
  transition: all 80ms ease;
}

.storage-widget__snackbar {
  white-space: break-spaces;
  cursor: pointer;
}

@media screen and (min-width: map-get($grid-breakpoints, 'sm')) {
  .storage-widget {
    flex-direction: row-reverse;
  }

  .storage-widget__help {
    right: rem(-10px);
    left: auto;
    transform: translate(50%, 50%);
  }

}

</style>
