export type InitialStateT = Array<UniquePopupMessageT>

export interface PopupMessageT {
	type: PopupStatusT
	text: string
	duration?: number
}

export interface UniquePopupMessageT extends PopupMessageT {
	id: string
}

export type PopupStatusT = 'error' | 'success' | 'warning' | 'information'
