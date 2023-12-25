import clsx from 'clsx'
import { FC } from 'react'
import s from './OwnAppointmentList.module.scss'
import { UniqueUserAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import { RecordInfo } from '../../UI/record-info/RecordInfo'

interface IOwnAppointmentListProps {
	className?: string
	userAppointments: UniqueUserAppointmentT[]
}

export const OwnAppointmentList: FC<IOwnAppointmentListProps> = ({
	className,
	userAppointments
}) => {
	const doctorsInfo = useAppSelector(state => state.appointment.doctorsInfo)

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{userAppointments.map(item => {
				const chosenDoc = doctorsInfo.find(
					doctor => doctor.id === item.doctorId
				)
				return (
					<li key={item.id}>
						<RecordInfo
							info={{
								...item,
								name: chosenDoc?.name,
								specialization: chosenDoc?.specialization
							}}
						/>
					</li>
				)
			})}
			<p className={s['message']}>
				{userAppointments?.length === 0 && 'У вас нет никаких записей'}
			</p>
		</ul>
	)
}
