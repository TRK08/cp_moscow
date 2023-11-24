<template>
  <n-spin v-if="fetchStatus === 'loading'" size="large" style="width: 100%;" />
  <n-grid v-if="archive.length > 0" cols="2 800:3" x-gap="16" y-gap="16">
    <n-gi v-for="item in archive" :key="item.id">
      <ArchiveCard :archiveItem="item" @click="loadVideo(item.id)" />
    </n-gi>
  </n-grid>


  <n-modal v-model:show="videoPath"  preset="card" style="width: fit-content; min-width: 50vw" @close="videoPath = null">
    <VideoPlayer v-if="videoPath" :path="videoPath" />
    <n-result
        v-else
        status="info"
        title="Подождите, видео обрабатывается"
    >
      <template #footer>
        <n-spin size="large" />
      </template>
    </n-result>

  </n-modal>
</template>

<script setup lang="ts">

import ArchiveCard from "@/components/ArchiveCard.vue";
import {onBeforeMount} from "vue";
import {storeToRefs} from "pinia";
import {useArchiveStore} from "@/stores/archive";
import {useNotification} from 'naive-ui'
import VideoPlayer from "@/components/VideoPlayer.vue";
import {useVideoStore} from "@/stores/video";


const {videoId, videoPath} = storeToRefs(useVideoStore())
const {checkVideoStatus} = useVideoStore()
const {archive, fetchStatus} = storeToRefs(useArchiveStore())
const {getArchive} = useArchiveStore()

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

const loadVideo = async (id: string) => {
  const res = await checkVideoStatus(id, true)
  console.log(res, 'RES')
  if (res?.status === 'error') {
    notification.warning({
      content: 'Видео еще не обработано',
      duration: 3000
    })
  }
}

onBeforeMount(() => {
  loadArchive()
})
</script>

<style lang="scss">

</style>
