<template>
  <n-card>
    <div class="home-page__upload">
      <n-spin v-if="fetchStatus === 'loading'" size="large" style="width: 100%;" />
      <n-upload
          v-else
          directory-dnd
          :on-change="upload"
          :show-file-list="false"
          accept="video/mp4"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3" :component="ArchiveOutline" />
          </div>
          <n-text style="font-size: 16px">
            Кликните или перетащите файл
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            Доступный формат: .mp4
          </n-p>
          <n-p depth="3" style="margin: 8px 0 0 0">
            Максимальный размер: 250 МБ
          </n-p>
        </n-upload-dragger>
      </n-upload>

    </div>
  </n-card>
</template>

<script setup lang="ts">

import {ArchiveOutline} from "@vicons/ionicons5";
import {storeToRefs} from "pinia";
import {useVideoStore} from "@/stores/video";
import {type UploadFileInfo, useNotification} from "naive-ui";

const notification = useNotification()

const {fetchStatus, videoId} = storeToRefs(useVideoStore())
const {uploadVideo, checkVideoStatus} = useVideoStore()

const upload = async (file: UploadFileInfo) => {
  const res = await uploadVideo(file)
  if (res?.id) {
    const status = await checkVideoStatus(res.id)

    if (status?.status === 'error' && status?.code === 500) {
      notification.error({
        content: 'Что-то пошло не так',
        duration: 3000
      })
      videoId.value = null
    }
  }
 if (res?.status === 'error') {
    notification.error({
      content: 'Что-то пошло не так',
      duration: 3000
    })
  }
}
</script>

<style lang="scss">

</style>
