import clsx from 'clsx'
import closeIcon from '../../../assets/images/icons/close.svg'
import { removeMessage } from '../../../redux/slices/popupMessages-slice/popupMessagesSlice'
import { PopupStatusT } from '../../../redux/slices/popupMessages-slice/types'
import { useAppDispatch } from '../../../redux/store'
import { statusConvert } from '../../utils/popup-messages/statusConvert'
import s from './PopupMessage.module.scss'

type PopupMessagePropsT = {
	type: PopupStatusT
	text: string
	id: string
}

export const PopupMessage = ({ type, text, id }: PopupMessagePropsT) => {
	const dispatch = useAppDispatch()

	return (
		<div className={clsx(s[type], s['popup-message'])}>
			<div>
				<h4 className={s['title']}>{statusConvert[type]}</h4>
				<p>{text}</p>
			</div>
			<button
				className={s['close-btn']}
				type='button'
				onClick={() => {
					dispatch(removeMessage(id))
				}}
			>
				<img src={closeIcon} />
			</button>
		</div>
	)
}
