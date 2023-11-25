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
            Кликните или перетащите видео
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            Доступный формат: .mp4
          </n-p>
          <n-p depth="3" style="margin: 8px 0 0 0">
            Максимальный размер: 100 МБ
          </n-p>
        </n-upload-dragger>
      </n-upload>

    </div>
  </n-card>
</template>

<script setup lang="ts">
import {h} from 'vue';
import {ArchiveOutline} from "@vicons/ionicons5";
import {storeToRefs} from "pinia";
import {useVideoStore} from "@/stores/video";
import {type UploadFileInfo, useNotification, NButton} from "naive-ui";
import {useRouter} from "vue-router";

const notification = useNotification()

const {fetchStatus} = storeToRefs(useVideoStore())
const {uploadVideo} = useVideoStore()

const router = useRouter()


const upload = async (file: UploadFileInfo) => {
  const res = await uploadVideo(file)

  if (res) {
    notification.success({
      title: 'Видео успешно загружено и обрбатывется.',
      content: 'Результаты обработки доступны во вкладке "Архив"',
      duration: 7000,
      closable: true,
      action: () =>
          h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  router.push('/archive')
                }
              },
              {
                default: () => 'Перейти в архив'
              }
          ),
    })
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
