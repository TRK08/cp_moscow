<template>
  <div class="home-page">

    <h2></h2>

    <UploadFile />

<!--    <n-modal v-model:show="videoId"  preset="card" style="width: fit-content; min-width: 50vw">-->
<!--      <n-result-->
<!--          status="info"-->
<!--          title="Подождите, видео обрабатывается"-->
<!--      >-->
<!--        <template #footer>-->
<!--          <n-spin size="large" />-->
<!--        </template>-->
<!--      </n-result>-->

<!--    </n-modal>-->
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useVideoStore} from "@/stores/video";
import UploadFile from "@/components/UploadFile.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { onBeforeUnmount} from "vue";

const {fetchStatus, videoId, videoPath} = storeToRefs(useVideoStore())

onBeforeUnmount(() => {
  videoId.value = null
  videoPath.value = null
})



</script>

<style lang="scss">
.home-page {
  &__upload {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  .n-card {
    border-radius: 1rem;
  }
}
</style>
