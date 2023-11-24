<template>
  <n-card hoverable style="cursor: pointer">
    <n-space vertical :wrap-item="false">
      <p class="archive-card__name" :title="props.archiveItem.name">Файл: {{props.archiveItem.name}}</p>
      <small>Дата: {{date}}</small>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{archiveItem: Record<string, any>}>()


const date = computed(() => {
  return new Date(props.archiveItem.created).toLocaleString()
})
</script>

<style lang="scss">
.n-card {
  border-radius: 1rem;
}

.archive-card__name {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1.2em;
  white-space: nowrap;
}

</style>
