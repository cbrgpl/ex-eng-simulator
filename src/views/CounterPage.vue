<script setup lang="ts" >
import { useUserStore } from '@store/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

type IProp = { [prop: string]: never }
defineProps<IProp>()

const userStore = useUserStore()

const { username } = storeToRefs( userStore )
const count = ref( 0 )
</script>

<template >
  <div >
    <VBtn 
      color="primary"
      type="button"
      @click="count++" >
      Hello, {{ username }}, ur count is {{ count }}
    </VBtn>
  </div>
</template>

<style scoped >
</style>
