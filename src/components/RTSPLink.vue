<template>
  <n-card>
    <n-input
        v-model:value="RTSPLink"
        placeholder="Введите ссылку на RTSP поток"
        :theme-overrides="theme === null ? inputThemeOverridesLight: inputThemeOverridesDark"
    />
    <n-button
        type="primary"
        style="width: 100%; margin-top: 1rem"
        @click="sendRTSPlink"
    >Отправить</n-button>
  </n-card>

  <n-modal v-model:show="streamSrc" :mask-closable="false"  preset="card" style="width: fit-content; min-width: 40vw" @close="RTSPLink = null">
    <img v-if="streamSrc" style="max-width: 40vw; min-height: 40vh; width: 100%; height: 100%" :src="streamSrc" alt="stream"/>
  </n-modal>

</template>

<script setup lang="ts">
import type {InputProps} from "naive-ui";
import {useGlobalStore} from "@/stores";
import {storeToRefs} from "pinia";
import {ref} from "vue";

type InputThemeOverrides = NonNullable<InputProps['themeOverrides']>
const {theme} = storeToRefs(useGlobalStore())

const inputThemeOverridesLight: InputThemeOverrides = {
  color: '#FFFFFF'
}
const inputThemeOverridesDark: InputThemeOverrides = {
  color: '#333333'
}

const streamSrc = ref<string | null>(null)
const RTSPLink = ref<string | null>(null)
const sendRTSPlink = () => {
  streamSrc.value = `https://89.232.165.248.sslip.io/api/v1/ml/rl?url_rtsp=${RTSPLink.value}`
}

</script>

<style lang="scss">

</style>
