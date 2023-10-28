import clsx from 'clsx'
import { FC } from 'react'
import {
    UniqueDoctorAppointmentT,
    UniqueUserAppointmentT
} from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
<<<<<<< HEAD
import { InfoButton } from '../../UI/InfoButton/InfoButton'
=======
import {InfoButton} from '../../UI/InfoButton/InfoButton'
>>>>>>> 3a962410ac99230ab2c785049352d0f26f644d11
import s from './AppointmentList.module.scss'

interface IAppointmentListProps {
	className?: string
	userAppointments?: UniqueUserAppointmentT[]
	doctorAppointments?: UniqueDoctorAppointmentT[]
}

export const AppointmentList: FC<IAppointmentListProps> = ({
	className,
	userAppointments,
	doctorAppointments
}) => {
	const { doctorsInfo, usersInfo } = useAppSelector(state => {
		return {
			doctorsInfo: state.appointment.doctorsInfo,
			usersInfo: state.appointment.usersInfo
		}
	})

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{userAppointments &&
				userAppointments.map(item => {
					const chosenDoc = doctorsInfo.find(
						doctor => doctor.id === item.doctorId
					)
					return (
						<li key={item.id}>
							<InfoButton id={item.id} info={{ ...chosenDoc, ...item }} />
						</li>
					)
				})}
			{doctorAppointments &&
				doctorAppointments.map(item => {
					const chosenUser = usersInfo.find(user => user.id === item.userId)
					return (
						<li key={item.id}>
							<InfoButton id={item.id} info={{ ...chosenUser, ...item }} />
						</li>
					)
				})}
			<p className={s['message']}>
				{(userAppointments?.length === 0 && 'У вас нет никаких записей') ||
					(doctorAppointments?.length === 0 &&
						'Нет записей за выбранную дату и сортировку')}
			</p>
		</ul>
	)
}
<<<<<<< HEAD
=======

export AppointmentList
>>>>>>> 3a962410ac99230ab2c785049352d0f26f644d11
