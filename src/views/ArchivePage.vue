<template>
  <n-spin v-if="fetchStatus === 'loading'" size="large" style="width: 100%;" />
  <n-grid v-if="archive.length > 0" cols="2 800:3" x-gap="16" y-gap="16">
    <n-gi v-for="item in archive" :key="item.id">
      <ArchiveCard :archiveItem="item" @more="loadArchiveCard" />
    </n-gi>
  </n-grid>


  <n-modal
      v-model:show="hasVideoPath"
      preset="card"
      style="width: fit-content; min-width: 50vw; min-height: 300px"
      @close="videoPath = null"
  >
    <VideoPlayer v-if="videoPath" :path="videoPath" />
  </n-modal>


  <n-modal
    v-model:show="hasVideoCard"
    preset="card"
    style="width: fit-content; min-width: 90vw; height: 100%; max-height: 90vh; overflow: hidden"
    @close="closeMorePopup"
  >
    <template v-if="archiveCard">
      <n-scrollbar style="max-height: 80vh;">
        <n-grid cols="4" x-gap="16" y-gap="16">
          <n-gi v-for="card in archiveCard?.screenshots" :key="card.id">
            <n-card style="min-height: 300px; overflow: hidden">
              <template #cover>
                <img :src="`https://89.232.165.248.sslip.io:9002/static/${card.path}`" />
              </template>
              <template #action>
                <n-space vertical justify="start" align="center">
                  <span>Тип отходов: {{card.type}}</span>
<!--                  <span>Время на видео: {{secondsToMinutesAndSeconds(card.time)}}</span>-->
                </n-space>
              </template>
            </n-card>
          </n-gi>
        </n-grid>
      </n-scrollbar>
    </template>

  </n-modal>
</template>

<script setup lang="ts">

import ArchiveCard from "@/components/ArchiveCard.vue";
import {computed, onBeforeMount} from "vue";
import {storeToRefs} from "pinia";
import {useArchiveStore} from "@/stores/archive";
import {useNotification} from 'naive-ui'
import VideoPlayer from "@/components/VideoPlayer.vue";
import {useVideoStore} from "@/stores/video";


const {videoPath} = storeToRefs(useVideoStore())
const {archive, archiveCard, fetchStatus} = storeToRefs(useArchiveStore())
const {getArchive, getArchiveCard} = useArchiveStore()
const notification = useNotification()

const loadArchive = async () => {
  const res = await getArchive()
  if (res?.status === 'error') {
    notification.error({
      content: 'Не удалось загрузить архив',
      duration: 3000
    })
  }
}

const loadArchiveCard = async (id: string) => {
  const res = await getArchiveCard(id)
  if (res?.status === 'error') {
    notification.error({
      content: 'Что-то пошло не так',
      duration: 3000
    })
  }
}

const hasVideoPath = computed(() => {
  return !!videoPath.value
})

const hasVideoCard = computed(() => {
  return !!archiveCard.value
})

const secondsToMinutesAndSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const closeMorePopup = () => {
  archiveCard.value = null
  loadArchive()

}


onBeforeMount(() => {
  loadArchive()
})
</script>

<style lang="scss">

</style>
