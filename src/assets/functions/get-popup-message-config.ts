import { v4 } from 'uuid'
import { PopupMessageT } from '../../redux/slices/popupMessages-slice/types'

type GetMessageConfigFuncT = (
	text: PopupMessageT['text'],
	type: PopupMessageT['type'],
	duration?: PopupMessageT['duration']
) => PopupMessageT

export const getPopupMessageConfig: GetMessageConfigFuncT = (
	text,
	type,
	duration = 3000
) => {
	return {
		id: v4(),
		text,
		type,
		duration
	}
}
