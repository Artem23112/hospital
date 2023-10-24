import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { userSendAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSendAppointment.ts'
import { userSubscribeToBusyDates } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSubscribeToBusyDates.ts'
import { clearSubmitStatus } from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/types.ts'
import { showPopupMessage } from '../../../redux/slices/popupMessages-slice/popupMessagesSlice'
import { useAppSelector } from '../../../redux/store'
import { useAppDispatch } from '../../../redux/store.ts'
import DateTimePicker, {
	ChosenDateT
} from '../../UI/DateTimePicker/DateTimePicker'
import DoctorsList, { DoctorValueT } from '../../UI/DoctorsList/DoctorsList'
import s from './MakeAppointmentPanel.module.scss'

const MakeAppointmentPanel = () => {
	const [chosenDoctor, setChosenDoctor] = useState<DoctorValueT>(null)
	const [chosenDate, setChosenDate] = useState<ChosenDateT>(null)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { doctorsInfo, isSuccess } = useAppSelector<SelectedT>(state => {
		return {
			doctorsInfo: state.appointment.doctorsInfo,
			isSuccess: state.appointment.isSuccessSubmit
		}
	})

	useEffect(() => {
		if (!isSuccess) return

		navigate('/profile/appointment-list')
		dispatch(clearSubmitStatus())
	}, [isSuccess])

	useEffect(() => {
		if (!chosenDoctor) return

		dispatch(userSubscribeToBusyDates(chosenDoctor))
	}, [chosenDoctor])

	function makeAppointment() {
		if (!chosenDoctor) {
			dispatch(
				showPopupMessage({
					text: 'Извините, но вы не выбрали доктора',
					type: 'warning'
				})
			)
			return
		}
		if (!chosenDate) {
			dispatch(
				showPopupMessage({
					text: 'Извините, но вы не выбрали дату или время посещения',
					type: 'warning'
				})
			)
			return
		}

		const appointmentInfo = {
			doctorId: chosenDoctor,
			fullDateISO: chosenDate.toISOString()
		}
		dispatch(userSendAppointment(appointmentInfo))
	}

	return (
		<>
			<div className={s['content-wrapper']}>
				<DoctorsList
					doctorsInfo={doctorsInfo}
					selectedDoctor={chosenDoctor}
					choiceDoctorCb={docId => {
						setChosenDoctor(docId as DoctorValueT)
					}}
				/>
				<DateTimePicker
					selectedDate={chosenDate}
					choiceDateCb={date => {
						setChosenDate(date as ChosenDateT)
					}}
				/>
				<button
					className={clsx(s['btn'], s['end'])}
					onClick={() => {
						makeAppointment()
					}}
				>
					Записаться
				</button>
			</div>
		</>
	)
}

type SelectedT = { doctorsInfo: UniqueDoctorInfoT[]; isSuccess: boolean }

export default MakeAppointmentPanel
