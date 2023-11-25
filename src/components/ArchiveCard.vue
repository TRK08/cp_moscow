<template>
  <n-card hoverable style="cursor: pointer; overflow: hidden">
    <n-space vertical :wrap-item="false">
      <p class="archive-card__name" :title="props.archiveItem.name">Файл: {{props.archiveItem.name}}</p>
      <small>Дата: {{date}}</small>
      <span v-if="props.archiveItem.popular">Категория: {{props.archiveItem.popular}}</span>
    </n-space>
    <template #action>
      <n-space justify="space-between" align="center">
        <n-space :wrap-item="false" align="center" class="archive-card__status">
          <span
            class="archive-card__status-icon"
            :style="{backgroundColor: status.color}"
          />
          <small>{{status.text}}</small>

        </n-space>
        <n-space>
<!--          <n-button-->
<!--            :disabled="props.archiveItem.status === 'processing'"-->
<!--            round type="tertiary"-->
<!--            @click="loadVideo(props.archiveItem.id)"-->
<!--          >-->
<!--            Видео-->
<!--          </n-button>-->
          <n-button
              round
              type="primary"
              @click="emits('more', props.archiveItem.id)"
          >
            Подробнее
          </n-button>
        </n-space>
      </n-space>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useVideoStore} from "@/stores/video";
import {useNotification} from "naive-ui";

type statuses = 'processing' | 'completed'

const {checkVideoStatus} = useVideoStore()
const notification = useNotification()

const props = defineProps<{archiveItem: Record<string, any>}>()
const emits = defineEmits(['more'])

const statuses = {
  processing: {
    text: 'Файл обрабатывается',
    color: '#FCE83A'
  },
  completed: {
    text: 'Обработка завершена',
    color: '#56F000'
  }
} as Record<statuses, any>

const loadVideo = async (id: string) => {
  const res = await checkVideoStatus(id)
  if (res?.status === 'error') {
    notification.warning({
      content: 'Видео еще не обработано',
      duration: 3000
    })
  }
}

const status = computed(() => {
  return statuses[props.archiveItem.status as statuses]
})

const date = computed(() => {
  const date = new Date(props.archiveItem.created)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toLocaleString()
})
</script>

<style lang="scss">
.n-card {
  border-radius: 1rem;
}

.archive-card {
  &__name {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 1.2em;
    white-space: nowrap;
  }
  &__status {
    &-icon {
      display: block;
      width: 9px;
      height: 9px;
      border-radius: 100%;
      background-color: red;
    }
  }
}

</style>
