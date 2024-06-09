import { InfoCard } from '@/components/UI/info-card-compound/InfoCard'
import { UniqueDoctorAppointmentT } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { uniqueUserInfo } from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { useAppSelector } from '@/redux/store'
import clsx from 'clsx'
import s from './PatientList.module.scss'
import { Fragment } from 'react'

type PatientListPropsT = {
	className?: string
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const PatientList = ({
	className,
	doctorAppointments,
}: PatientListPropsT) => {
	const usersInfo = useAppSelector(state => state.appointment.usersInfo)

	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{doctorAppointments.map((item, index) => {
				const chosenUser = usersInfo.find(user => user.id === item.userId)

				if (!uniqueUserInfo.guard(chosenUser))
					return <Fragment key={index}></Fragment>

				return (
					<li key={item.id}>
						<InfoCard>
							<InfoCard.About name={chosenUser.name} />
							<InfoCard.TimeInfo fullDateISO={item.fullDateISO} />
							<InfoCard.Status status={item.status} />
							{item.status === 'enrolled' && (
								<InfoCard.AnswerBtns
									id={item.id}
									userId={item.userId}
								></InfoCard.AnswerBtns>
							)}
						</InfoCard>
					</li>
				)
			})}
			<p className={s['message']}>
				{!doctorAppointments.length &&
					'Нет пациентов за выбранную дату и сортировку'}
			</p>
		</ul>
	)
}
