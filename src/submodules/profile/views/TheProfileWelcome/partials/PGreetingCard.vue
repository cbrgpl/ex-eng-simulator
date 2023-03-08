<script setup lang="ts" >
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const { lgAndUp } = useDisplay()
</script>

<template >
  <v-card
    class="pa-lg-2"
    :variant="lgAndUp ? 'elevated' : 'flat'"
    :color="lgAndUp ? '' : 'transparent'" >
    <v-card-title class="text-center text-h3 mb-4" >
      {{ t('Profile.Welcome') }}
    </v-card-title>
    <v-card-text
      tag="p"
      class="text-justify profile-welcome__description" >
      {{ t('Profile.WelcomeDescription') }}
    </v-card-text>

    <v-divider class="my-3" />

    <v-card-actions class="d-flex flex-column flex-md-row justify-md-end" >
      <v-btn
        class="profile-welcome__button text-none px-4"
        variant="elevated"
        rounded="sm"
        prepend-icon="folder-plus"
        :size="lgAndUp ? 'large' : 'x-large'"
        color="primary" >
        {{ t('Profile.CreateNewProfile') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss" >
@import '~vuetify';
  
.profile-welcome__card {
  width: 100%;
  max-width: rem(520px);
  padding: rem(map-get($spacers, 1));   
}

.profile-welcome__button {
  width: 100%;
}

:deep(.v-card-actions .v-btn ~ .v-btn) {
  margin-inline-start: 0;
}

.profile-welcome__description {
  line-height: 1.5 !important;
  white-space: pre-line;
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .profile-welcome__card {
    max-width: rem(760px);
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'lg')) {
  .profile-welcome__button {
    width: auto;
  }
}
</style>
