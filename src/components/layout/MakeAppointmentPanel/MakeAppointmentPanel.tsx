import clsx from 'clsx'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { additionDateWithTime } from '../../../assets/functions/additionDateWithTime.ts'
import { userSendAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSendAppointment.ts'
import { userSubscribeToBusyDates } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSubscribeToBusyDates.ts'
import { clearSubmitStatus } from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/types.ts'
import { showPopupMessage } from '../../../redux/slices/popupMessages-slice/popupMessagesSlice'
import { useAppSelector } from '../../../redux/store'
import { useAppDispatch } from '../../../redux/store.ts'
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker'
import DoctorsList from '../../UI/DoctorsList/DoctorsList'
import s from './MakeAppointmentPanel.module.scss'
import { IAppointmentData, IManageAppointmentData } from './types.ts'

export const ManageAppointmentData = createContext<IManageAppointmentData>({
	chosenDoctor: null,
	chosenDate: null,
	chosenTime: null,
	changeData: null
})

const MakeAppointmentPanel = () => {
	const [{ chosenDoctor, chosenDate, chosenTime }, setAppointmentData] =
		useState<IAppointmentData>({
			chosenDoctor: null,
			chosenDate: null,
			chosenTime: null
		})
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
		if (!chosenDoctor || !chosenDate || !chosenTime) {
			dispatch(
				showPopupMessage({
					text: 'Извините, но вы выбрали не все, что необходимо для записи',
					type: 'warning'
				})
			)
			return
		}

		const appointmentInfo = {
			doctorId: chosenDoctor,
			fullDateISO: additionDateWithTime(chosenDate, chosenTime)
		}
		dispatch(userSendAppointment(appointmentInfo))
	}

	return (
		<>
			<div className={s['content-wrapper']}>
				<ManageAppointmentData.Provider
					value={{
						chosenDoctor,
						chosenDate,
						chosenTime,
						changeData: setAppointmentData
					}}
				>
					<DoctorsList doctorsInfo={doctorsInfo} />
					<DateTimePicker />
				</ManageAppointmentData.Provider>
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
