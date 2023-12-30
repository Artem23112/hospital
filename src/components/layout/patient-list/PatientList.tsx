import { RecordInfo } from '@/components/UI/record-info/RecordInfo'
import { UniqueDoctorAppointmentT } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { uniqueUserInfo } from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { useAppSelector } from '@/redux/store'
import clsx from 'clsx'
import s from './PatientList.module.scss'

type PatientListPropsT = {
	className?: string
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const PatientList = ({ className, doctorAppointments }: PatientListPropsT) => {
	const usersInfo = useAppSelector(state => state.appointment.usersInfo)

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{doctorAppointments.map(item => {
				const chosenUser = usersInfo.find(user => user.id === item.userId)
				if (!uniqueUserInfo.guard(chosenUser)) return <></>

				return (
					<li key={item.id}>
						<RecordInfo info={item} name={chosenUser.name} userId={item.userId} />
					</li>
				)
			})}
			<p className={s['message']}>
				{!doctorAppointments.length && 'Нет пациентов за выбранную дату и сортировку'}
			</p>
		</ul>
	)
}
