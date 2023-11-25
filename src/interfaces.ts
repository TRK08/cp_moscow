export interface IArchiveCard {
    id: string
    name: string
    path: string
    status: string
    created: string
    popular: string
    screenshots: IScreenshot[]
}

export interface IScreenshot {
    id: string
    path: string
    time: number
    type: string
    created: Date
}