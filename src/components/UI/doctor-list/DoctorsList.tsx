import { UniqueDoctorInfoT } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { userSubscribeToBusyDates } from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/userSubscribeToBusyDates'
import {
	selectorChosenDoctor,
	setChosenAppointmentData,
} from '@/redux/slices/appointments-slice/appointmentsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useEffect } from 'react'
import { InfoCard } from '../info-card-compound/InfoCard'
import s from './DoctorsList.module.scss'

type DoctorsListPropsT = {
	doctorsInfo: UniqueDoctorInfoT[]
}

export const DoctorsList = ({ doctorsInfo }: DoctorsListPropsT) => {
	const dispatch = useAppDispatch()
	const chosenDoctor = useAppSelector(selectorChosenDoctor)

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
						<li key={info.id}>
							<InfoCard
								active={chosenDoctor === info.id}
								handleClick={() => choosingDoctor(info.id)}
							>
								<InfoCard.About name={info.name} specialization={info.specialization} />
								<InfoCard.TimeInfo textDate={'Пн-Пт'} textTime={'8:00-17:00'} />
							</InfoCard>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export type DoctorValueT = string | null
