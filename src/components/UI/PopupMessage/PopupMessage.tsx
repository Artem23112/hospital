import clsx from 'clsx'
import closeIcon from '../../../assets/images/icons/close.svg'
import { removeMessage } from '../../../redux/slices/popupMessages-slice/popupMessagesSlice'
import { PopupStatusT } from '../../../redux/slices/popupMessages-slice/types'
import { useAppDispatch } from '../../../redux/store'
import s from './PopupMessage.module.scss'
import { FC } from 'react'

interface IPopupMessageProps {
	type: PopupStatusT
	text: string
	id: string
}

const PopupMessage: FC<IPopupMessageProps> = ({ type, text, id }) => {
	const dispatch = useAppDispatch()

	return (
		<div className={clsx(s[type], s['popup-message'])}>
			<div>
				<h4 className={s['title']}>{type[0].toUpperCase() + type.slice(1)}</h4>
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

export default PopupMessage
