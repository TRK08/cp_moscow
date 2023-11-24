import {defineStore} from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


interface IState {
    fetchStatus: 'init' | 'loading' | 'error' | 'success'
    archive: Record<string, any>[]
}

export const useArchiveStore = defineStore('archive',  {
    state: (): IState => ({
        fetchStatus: 'init',
        archive: []
    }),
    actions: {
        async getArchive(): Promise<any> {
            try {
                const res = await axios
                    .get('https://89.232.165.248.sslip.io/api/v1/ml/list')
                if (res) {
                    this.archive = res.data
                    return this.archive
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
        }
    }
})
