import { doctorAnswer } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/doctorAnswer'
import { StatusAppointmentT } from '@/redux/slices/appointments-slice/types'
import { useAppDispatch } from '@/redux/store'
import clsx from 'clsx'
import { FC } from 'react'
import s from './index.module.scss'

type AnswerBtnsPropsT = {
	id: string
	userId: string
}

export const AnswerBtns: FC<AnswerBtnsPropsT> = ({ id, userId }) => {
	const dispatch = useAppDispatch()

	function answering(type: StatusAppointmentT) {
		if (!userId) return

		dispatch(doctorAnswer({ userId: userId, appointmentId: id, type }))
	}

	return (
		<div className={s['functional-btns-wrapper']}>
			<button
				className={clsx(s['functional-btn'], s['accept'])}
				onClick={() => {
					answering('admitted')
				}}
			>
				Пациент принят
			</button>
			<button
				className={clsx(s['functional-btn'], s['cancel'])}
				onClick={() => {
					answering('not-admitted')
				}}
			>
				Пациент не пришел
			</button>
		</div>
	)
}
