<template>
  <video class="video__player" ref="video" width="100%" height="640" controls></video>
</template>

<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import Hls from 'hls.js';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';

const props = defineProps<{path: string}>()

const video = ref<HTMLVideoElement | null>(null)

const hls = new Hls();


onMounted(() => {
  const videoEl = video.value
  const path = `https://89.232.165.248.sslip.io:9002/${props.path}`

  if (Hls.isSupported() && videoEl) {
    hls.loadSource(path);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      videoEl.volume = 0
      videoEl.play();
    });

    plyr.setup(videoEl)
  }
})

onUnmounted(() => {
  hls.destroy()
})
</script>

<style lang="scss">
.video__player {
  width: 50vw;
  height: 50vh;
}
</style>
