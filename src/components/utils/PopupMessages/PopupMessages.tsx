import { UniquePopupMessageT } from '../../../redux/slices/popupMessages-slice/types'
import { RootState, useAppSelector } from '../../../redux/store'
import PopupMessage from '../../UI/PopupMessage/PopupMessage'
import s from './PopupMessages.module.scss'

const PopupMessages = () => {
	const messages = useAppSelector<UniquePopupMessageT[]>(
		(state: RootState) => state.popupMessage
	)

	return (
		<div className={s['messages-wrapper']}>
			{messages.map(m => {
				return <PopupMessage type={m.type} text={m.text} id={m.id} key={m.id} />
			})}
		</div>
	)
}

export default PopupMessages