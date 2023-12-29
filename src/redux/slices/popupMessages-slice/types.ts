import { Unique } from '@/main-types'

export type InitialStateT = Array<UniquePopupMessageT>

export interface PopupMessageT {
	type: PopupStatusT
	text: string
	duration?: number
}

export type UniquePopupMessageT = Unique<PopupMessageT>

export type PopupStatusT = 'error' | 'success' | 'warning' | 'information'
