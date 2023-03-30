<script lang="ts" >
import PLimitPane from './partials/PLimitPane.vue'
import PMemoryPane from './partials/PMemoryPane.vue'
import PMemoryStatistic from './partials/PMemoryStatistic.vue'
import ZLogConsole from '@/components/ZLogConsole/ZLogConsole.vue'

export default { 
  components: {
    PLimitPane,
    PMemoryPane,
    PMemoryStatistic,
    ZLogConsole,
  },
}
</script>

<script setup lang="ts" >
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { panes } from './static/panes'

const { t } = useI18n()
const activePane = ref( panes[ 0 ].component )
</script>

<template >
  <v-card >
    <v-card-title class="text-center" >
      {{ t('Profile.StorageCard') }}
    </v-card-title>

    <v-card-text >
      <v-list class="mb-4" >
        <v-list-item tag="p" >
          <v-icon
            class="text-primary mr-2"
            size="x-large"
            icon="ic:twotone-memory" />
          {{ t('Profile.StorageCardMemoryControl') }}
        </v-list-item>
        <v-divider class="mb-6 my-2" />

        <v-list-item >
          <v-icon
            class="text-purple mr-2"
            size="x-large"
            icon="car-speed-limiter" />
          {{ t('Profile.StorageCardLimitControl') }}
        </v-list-item>
        <v-divider class="mb-6 my-2" />

        <v-list-item >
          <v-icon
            class="text-red mr-2"
            size="x-large"
            icon="chart-pie" />
          {{ t('Profile.StorageCardStatistic') }}
        </v-list-item>
      </v-list>

      <v-tabs
        v-model="activePane"
        align-tabs="center"
        
        color="primary" >
        <v-tab
          v-for="pane of panes"
          :key="pane.tabName" 
          :value="pane.component" >
          {{ t( pane.tabName ) }}
        </v-tab>
      </v-tabs>

      <v-window v-model="activePane" >
        <v-window-item
          v-for="pane of panes"
          :key="pane.tabName"
          :value="pane.component" >
          <component :is="pane.component" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-divider />

    <z-log-console thread="storageThread" />
  </v-card>
</template>

<style scoped lang="scss" >
</style>
