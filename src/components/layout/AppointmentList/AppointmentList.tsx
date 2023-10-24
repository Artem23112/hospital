import clsx from 'clsx'
import { FC } from 'react'
import {
	UniqueDoctorAppointmentT,
	UniqueDoctorInfoT,
	UniqueUserAppointmentT,
	UniqueUserInfoT
} from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import InfoButton from '../../UI/InfoButton/InfoButton'
import s from './AppointmentList.module.scss'

interface IProps {
	className?: string
	userAppointments?: UniqueUserAppointmentT[]
	doctorAppointments?: UniqueDoctorAppointmentT[]
}

const AppointmentList: FC<IProps> = ({
	className,
	userAppointments,
	doctorAppointments
}) => {
	const { doctorsInfo, usersInfo } = useAppSelector<SelectedT>(state => {
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

type SelectedT = {
	doctorsInfo: UniqueDoctorInfoT[]
	usersInfo: UniqueUserInfoT[]
}

export default AppointmentList
