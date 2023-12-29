import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSendAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSendAppointment.ts'
import {
	clearSubmitStatus,
	selectorDoctorsInfo,
	selectorIsSuccessSubmit,
} from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts'
import { DoctorsList } from '../../UI/doctor-list/DoctorsList.tsx'
import { DateTimePicker } from '../../UI/date-time-picker/DateTimePicker.tsx'
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
