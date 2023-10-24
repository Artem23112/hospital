import { useEffect, useState } from 'react'
import arrow from '../../../assets/images/icons/arrow.svg'
import { exit } from '../../../redux/slices/authentication-slice/additionalThunks/exit'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import s from './ProfileBtn.module.scss'

const ProfileBtn = () => {
	const email = useAppSelector<IAuthInitialState['email']>(
		(state: ) => state.authentication.email
	)
	const [showSubmenu, setShowSubmenu] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!showSubmenu) {
			document.removeEventListener('click', handleClick)
			return
		}

		function handleClick(e: Event) {
			const target = e.target
			if (!(target && target instanceof HTMLElement)) return

			if (!target.closest('.' + s['profile-btn-container'])) {
				setShowSubmenu(!showSubmenu)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [showSubmenu])

	return (
		<div className={s['profile-btn-container']}>
			<button
				className={s['profile-btn']}
				onClick={() => {
					setShowSubmenu(!showSubmenu)
				}}
			>
				<span className={s['profile-btn__name']}>{email}</span>
				<img className={s['profile-btn__arrow']} src={arrow} />
			</button>
			<ul
				className={`${s['profile-btn__submenu']} ${
					showSubmenu ? s['active'] : ''
				}`}
			>
				<li className={s['profile-btn__submenu-item']}>
					<button>Параметры</button>
				</li>
				<li className={s['profile-btn__submenu-item']}>
					<button
						onClick={() => {
							dispatch(exit())
						}}
					>
						Выход
					</button>
				</li>
			</ul>
		</div>
	)
}

export default ProfileBtn
