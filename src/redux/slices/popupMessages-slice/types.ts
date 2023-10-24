export type InitialStateT = Array<UniquePopupMessageT>

export type UniquePopupMessageT = PopupMessageT & { id: string }

export type PopupMessageT = {
	type: PopupStatusT
	text: string
	duration?: number
}

export type PopupStatusT = 'error' | 'success' | 'warning' | 'information'
