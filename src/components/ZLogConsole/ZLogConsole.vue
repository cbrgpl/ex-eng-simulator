<script setup lang="ts" >
import { type UThreads, useConsoleStore } from '@store/console'

import PLogCard from './partials/PLogCard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  thread: UThreads
}>()

const consoleStore = useConsoleStore()

const logs = consoleStore[ props.thread ].buffer
</script>

<template >
  <v-card
    :rounded="0"
    variant="elevated"
    class="log-console" >
    <v-card-title
      v-show="logs.length === 0"
      class="log-console__empty-title" >
      {{ t('Common.ConsoleEmptyTitle', { thread: t(`Profile.${props.thread}`) }) }}
    </v-card-title>

    <p-log-card
      v-for="log of logs"
      :key="log.id"
      :log="log" />
  </v-card>
</template>

<style scoped lang="scss" >
@import './utils/variables';
@import '~vuetify';

.v-theme--light {
  --v-theme-surface: #{add-commas($background)};
  --v-theme-on-surface: 255, 255, 255;
}

.log-console {
  overflow-y: auto;
  height: rem(420px);
  max-height: rem(720px);
  background-color: darken(rgb($background), 3%);
}

.log-console__empty-title {
  margin-top: map-get($spacers, 6);
  color: rgb($placeholder);
  font-weight: 500;
  font-size: map-get(map-get($typography, 'h5'), 'size');
  text-align: center;
  text-decoration: underline;
  opacity: 0.8
}

</style>
