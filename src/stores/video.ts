import {defineStore} from "pinia";
import axios from "axios";
import  {type UploadFileInfo} from "naive-ui";


interface IState {
    fetchStatus: 'init' | 'loading' | 'error' | 'success'
    videoPath: string | null
    videoId: string | null
}

export const useVideoStore = defineStore('video',  {
    state: (): IState => ({
        fetchStatus: 'init',
        videoPath: null,
        videoId: null,
    }),
    actions:  {
        async uploadVideo(fileInfo: UploadFileInfo) {
            this.fetchStatus = 'loading'
            this.videoPath = null
            const file = fileInfo?.file
            const formData = new FormData();
            // @ts-ignore
            formData.append('video', file?.file as File);

            try {
                const res = await axios.post(`https://89.232.165.248.sslip.io/api/v1/ml/load`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                if (res.data) {
                    this.videoId = res.data.id
                    this.fetchStatus = 'success'
                    return {
                        id: res.data.id
                    }
                }
            } catch (e: unknown) {
                this.fetchStatus = 'error'
                if (axios.isAxiosError(e)) {
                    console.log(e)
                    return {
                        status: this.fetchStatus,
                        code: e.response?.status
                    }
                }
            } finally {
                this.fetchStatus = "init"
            }
        },
        async checkVideoStatus(id: string, permanent = false) {
            try {
                const res = await axios
                    .get(`https://89.232.165.248.sslip.io/api/v1/ml/check?id=${id}`);
                if (res.data) {
                    this.fetchStatus = 'success'
                    this.videoPath = res.data.url
                    return {
                        path: res.data.url
                    }
                }
            } catch (e: unknown) {
                this.fetchStatus = 'error'
                if (axios.isAxiosError(e)) {
                    const status = e.response?.status
                    if(permanent) {
                        return {
                            status: this.fetchStatus,
                            code: e.response?.status
                        }
                    }
                    switch (status) {
                        case 404:
                            setTimeout(() => this.checkVideoStatus(this.videoId || ''), 15000)
                            break
                        default:
                            return {
                                status: this.fetchStatus,
                                code: e.response?.status
                            }
                    }
                }
            }
        }
    },
    getters: {}
})
