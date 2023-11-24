<template>
  <n-menu
      v-model:value="selectedKey"
      :collapsed="true"
      :collapsed-width="70"
      :collapsed-icon-size="25"
      :options="menuOptions"
  />
</template>

<script setup lang="ts">
import {h, type Component, computed} from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  HomeSharp as Home, FolderOutline as Folder
} from '@vicons/ionicons5'
import {RouterLink, useRoute} from "vue-router";

const route = useRoute();

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const selectedKey = computed(() => {
  return route.name
})

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                path: '/',
              }
            },
            { default: () => 'Главная страница' }
        ),
    key: 'home-page',
    icon: renderIcon(Home)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                path: '/archive',
              }
            },
            { default: () => 'Архив' }
        ),
    key: 'archive-page',
    icon: renderIcon(Folder)
  },
]
</script>


<style lang="scss">
.n-menu-item-content__icon {
  margin-right: 0!important;
}
</style>
