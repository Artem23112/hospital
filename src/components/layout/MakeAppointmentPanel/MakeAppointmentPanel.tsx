import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSendAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSendAppointment.ts'
import {
	clearSubmitStatus,
	selectorDoctorsInfo,
	selectorIsSuccessSubmit
} from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { useAppSelector } from '../../../redux/store'
import { useAppDispatch } from '../../../redux/store.ts'
import { DateTimePicker } from '../../UI/DateTimePicker/DateTimePicker'
import { DoctorsList } from '../../UI/DoctorsList/DoctorsList'
import s from './MakeAppointmentPanel.module.scss'

export const MakeAppointmentPanel = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const doctorsInfo = useAppSelector(selectorDoctorsInfo)
	const isSuccessSubmit = useAppSelector(selectorIsSuccessSubmit)

	useEffect(() => {
		if (!isSuccessSubmit) return
		navigate('/profile/appointment-list/')
		dispatch(clearSubmitStatus())
	}, [isSuccessSubmit])

	return (
		<>
			<div className={s['content-wrapper']}>
				<DoctorsList doctorsInfo={doctorsInfo} />
				<DateTimePicker />
				<button
					className={clsx(s['btn'], s['end'])}
					onClick={() => {
						dispatch(userSendAppointment())
					}}
				>
					Записаться
				</button>
			</div>
		</>
	)
}
