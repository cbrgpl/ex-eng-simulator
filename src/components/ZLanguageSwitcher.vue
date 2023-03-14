<script setup lang="ts" >
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { languages, type ILanguage } from '@/static/languages'
import { useLocaleStore } from '@/store/locale'

const localeStore = useLocaleStore()
const { activeLanguage } = storeToRefs( localeStore )

const isLanguageListVisible = ref( false )
const setLanguage = ( language: ILanguage ) => {
  if ( activeLanguage.value?.locale === language.locale || !isLanguageListVisible.value ) {
    return
  }

  activeLanguage.value = language
  isLanguageListVisible.value = false
}
</script>

<template >
  <div class="language-switcher" >
    <v-btn
      min-width="24px"
      height="auto"
      class="py-0 px-0"
      :style="{'filter': isLanguageListVisible ? 'grayscale(0.70)' : 'grayscale(0)' }"

      rounded
      @click="isLanguageListVisible = !isLanguageListVisible" >
      <v-img
        width="24px"
        :src="activeLanguage?.icon" />
    </v-btn>

    <v-fade-transition >
      <v-card
        v-if="isLanguageListVisible"
        class="language-switcher__list" >
        <v-card-actions class="d-flex flex-column" >
          <v-btn
            v-for="language of languages"
            :key="language.locale"
  
            min-width="48px"
            height="48px"
            class="language-switcher__btn"
        
            :active="language.locale === activeLanguage?.locale"
            :title="language.name"
            @click="setLanguage(language)" >
            <v-img
              width="36px"
              :src="language.icon" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </div>  
</template>

<style scoped lang="scss" >
@import '~vuetify';

.language-switcher {
  position: relative;
}


.fade-transition-enter-active {
  transition: all 80ms ease;
}


.language-switcher__list {
  position: absolute;
  right: 50%;
  bottom: rem(-20px);
  display: flex;
  flex-direction: column;
  border-radius: map-get($rounded, null);
  transform: translate(50%, 100%);
}

.language-switcher__btn {
  width: rem(36px);

  &:nth-child( n + 2 ) {
    margin: 0 !important;
    margin-top: map-get($spacers, 3) !important;
  }
}
</style>
