import { RecordInfo } from '../../UI/record-info/RecordInfo'
import { UniqueDoctorAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import clsx from 'clsx'
import { FC } from 'react'
import s from './PatientList.module.scss'
interface PatientListPropsI {
	className?: string
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const PatientList: FC<PatientListPropsI> = ({
	className,
	doctorAppointments
}) => {
	const usersInfo = useAppSelector(state => state.appointment.usersInfo)

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{doctorAppointments.map(item => {
				const chosenUser = usersInfo.find(user => user.id === item.userId)
				return (
					<li key={item.id}>
						<RecordInfo
							info={{ ...item, name: chosenUser?.name }}
							userId={item.userId}
						/>
					</li>
				)
			})}
			<p className={s['message']}>
				{doctorAppointments?.length === 0 &&
					'Нет пациентов за выбранную дату и сортировку'}
			</p>
		</ul>
	)
}
