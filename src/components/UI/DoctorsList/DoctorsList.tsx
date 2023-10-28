import { FC, useEffect } from 'react'
import { v4 } from 'uuid'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/types'
import InfoButton from '../InfoButton/InfoButton'
import s from './DoctorsList.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setChosenAppointmentData } from '../../../redux/slices/appointments-slice/appointmentsSlice'
import { userSubscribeToBusyDates } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSubscribeToBusyDates'

interface IDoctorsListProps {
	doctorsInfo: UniqueDoctorInfoT[]
}

const DoctorsList: FC<IDoctorsListProps> = ({ doctorsInfo }) => {
	const dispatch = useAppDispatch()
	const chosenDoctor = useAppSelector(
		state => state.appointment.appointmentData.chosenDoctor
	)

	useEffect(() => {
		if (!chosenDoctor) return
		dispatch(userSubscribeToBusyDates(chosenDoctor))
	}, [chosenDoctor])

	function choosingDoctor(id: string) {
		dispatch(setChosenAppointmentData({ chosenDoctor: id }))
	}

	return (
		<div>
			<h2 className={s['title']}>Выберите врача</h2>
			<ul className={s['doctor-list']}>
				{doctorsInfo.map(info => {
					return (
						<li key={v4()}>
							<InfoButton
								id={info.id}
								info={info}
								isSelected={chosenDoctor === info.id}
								handleClick={choosingDoctor}
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export type DoctorValueT = string | null

export default DoctorsList
