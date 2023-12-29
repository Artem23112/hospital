import clsx from 'clsx'
import { UniqueUserAppointmentT } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { selectorDoctorsInfo } from '../../../redux/slices/appointments-slice/appointmentsSlice'
import { useAppSelector } from '../../../redux/store'
import { RecordInfo } from '../../UI/record-info/RecordInfo'
import s from './OwnAppointmentList.module.scss'

type OwnAppointmentListPropsT = {
	className?: string
	userAppointments: UniqueUserAppointmentT[]
}

export const OwnAppointmentList = ({ className, userAppointments }: OwnAppointmentListPropsT) => {
	const doctorsInfo = useAppSelector(selectorDoctorsInfo)

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{userAppointments.map(item => {
				const chosenDoc = doctorsInfo.find(doctor => doctor.id === item.doctorId)
				return (
					<li key={item.id}>
						<RecordInfo
							info={{
								...item,
								name: chosenDoc?.name,
								specialization: chosenDoc?.specialization,
							}}
						/>
					</li>
				)
			})}
			<p className={s['message']}>{!userAppointments.length && 'У вас нет никаких записей'}</p>
		</ul>
	)
}
