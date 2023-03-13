<script setup lang="ts" >
import { ref } from 'vue'

const helpButtonVisible = ref( false )


</script>

<template >
  <v-card
    class="storage-widget"
    variant="text" >
    <v-progress-circular
      class="storage-widget__circular"
      color="orange"
      :model-value="75"
      :size="50"
      :width="12"
      @click="helpButtonVisible = !helpButtonVisible" >
    </v-progress-circular>

    <v-fade-transition >
      <v-btn
        v-if="helpButtonVisible"
        width="32px"
        min-width="24px"
        height="32px"
        class="storage-widget__help" >
        <v-icon
          icon="help-circle"
          size="32px" />
      </v-btn>
    </v-fade-transition>
  </v-card>
</template>

<style scoped lang="scss" >
.storage-widget {
  position: relative;
  overflow: visible;
  cursor: pointer;
}

.storage-widget__circular {
}

.storage-widget__help {
  position: absolute;
  right: rem(-5px);
  bottom: rem(10px);
  border-radius: 100%;
  transform: translate(50%, 50%);
}

.fade-transition-enter-active {
  transition: all 80ms ease;
}

</style>
