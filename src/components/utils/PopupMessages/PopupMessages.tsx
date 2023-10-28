import { useAppSelector } from '../../../redux/store'
import { PopupMessage } from '../../UI/PopupMessage/PopupMessage'
import s from './PopupMessages.module.scss'

export const PopupMessages = () => {
	const messages = useAppSelector(state => state.popupMessage)

	return (
		<div className={s['messages-wrapper']}>
			{messages.map(m => {
				return <PopupMessage type={m.type} text={m.text} id={m.id} key={m.id} />
			})}
		</div>
	)
}
<<<<<<< HEAD
=======

export PopupMessages
>>>>>>> 3a962410ac99230ab2c785049352d0f26f644d11
