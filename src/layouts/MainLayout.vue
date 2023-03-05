<script setup lang="ts" >
import { mainLayoutNav } from '@nav/mainLayout'
</script>

<template >
  <div >
    <ul class="nav-list" >
      <li
        v-for="option of mainLayoutNav"
        :key="option.routeName"
        class="nav-list__option" >
        <RouterLink :to="{name: option.routeName}" >
          <VIcon :icon="option.icon" />
          <span >
            {{ option.text }}
          </span>
        </RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped lang="scss" >
.nav-list {
  $black: #000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-list *:nth-child(n+1) {
  margin-left: 1rem;
}

.nav-list__option {
  display: flex;
  align-items: center;
}

.nav-list__option > *:first-child {
  margin-right: 0.5rem;
}

 </style>
