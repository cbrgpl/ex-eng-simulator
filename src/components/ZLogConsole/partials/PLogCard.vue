<script setup lang="ts" >
import { IConsoleLog } from '@store/console'
import { useI18n } from 'vue-i18n'
const { d, t } = useI18n()

const props = defineProps<{
  log: IConsoleLog
}>()

</script>

<template >
  <v-card
    :rounded="0"
    class="log-card"
    :class="`log-card--${props.log.variant}`"
    flat >
    <v-divider />
    <v-card-title class="pb-0" >
      <span class="log-card__title" >
        {{ props.log.title }}
      </span>

      <span class="log-card__id" >
        {{ t('Common.Id', { id: props.log.id }) }}
      </span>
    </v-card-title>
    <v-card-subtitle class="log-card__date" >
      {{ d( props.log.timestamp ) }}
    </v-card-subtitle>
    <v-card-text > {{ props.log.text }} </v-card-text>
    <v-divider />
  </v-card>
</template>

<style scoped lang="scss" >
@import '~vuetify';
@import './../utils/variables';

.log-card {
  --accent-color: #{$primary};

  border-left: 6px solid rgb(var(--accent-color));
  
  &:nth-of-type(n + 3) {
    margin-top: map-get($spacers, 6);
  }

  &--error {
    --accent-color: #{$error};
  }

  &--success {
    --accent-color: #{$success};
  }

  &--warning {
    --accent-color: #{$warning};
  }

  & .log-card__title {
    color: rgb(var(--accent-color));
  }
}

.log-card__id {
  float: right;
  color: rgb($placeholder);
  font-size: rem(14px);
  font-family: $font-mono;
  opacity: 0.8;
}

.log-card__date {
  margin-left: auto;
  color: rgb($placeholder);
  font-weight: 500;
  font-size: rem(14px);
  opacity: 0.8;
}
</style>
