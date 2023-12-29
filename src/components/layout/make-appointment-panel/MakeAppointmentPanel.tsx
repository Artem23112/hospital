import { DateTimePicker } from '@/components/UI/date-time-picker/DateTimePicker'
import { DoctorsList } from '@/components/UI/doctor-list/DoctorsList'
import { PATHS } from '@/paths'
import { userSendAppointment } from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSendAppointment'
import {
	clearSubmitStatus,
	selectorDoctorsInfo,
	selectorIsSuccessSubmit,
} from '@/redux/slices/appointments-slice/appointmentsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './MakeAppointmentPanel.module.scss'

export const MakeAppointmentPanel = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const doctorsInfo = useAppSelector(selectorDoctorsInfo)
	const isSuccessSubmit = useAppSelector(selectorIsSuccessSubmit)

	useEffect(() => {
		if (!isSuccessSubmit) return
		navigate(PATHS.profile.home + PATHS.profile.appointmentList)
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
