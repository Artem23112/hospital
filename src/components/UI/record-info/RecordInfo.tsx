import {
	convertStatusForDoctor,
	convertStatusForUser,
} from '@/assets/functions/convert-appointment-status'
import closeImg from '@/assets/images/icons/close.svg'
import { RequireRights } from '@/components/HOC/access-restrictions/RequireRights'
import { useParseDate } from '@/hooks/useParseDate'
import { deleteAppointment } from '@/redux/slices/appointments-slice/additionalThunks/deleteAppointment'
import { doctorAnswer } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/doctorAnswer'
import { UniqueDoctorAppointmentT } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { UniqueUserAppointmentT } from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { StatusAppointmentT } from '@/redux/slices/appointments-slice/types'
import { useAppDispatch } from '@/redux/store'
import clsx from 'clsx'
import { TimeInfo } from '../time-info/TimeInfo'
import s from './RecordInfo.module.scss'

type RecordInfoPropsT = {
	info: UniqueDoctorAppointmentT | UniqueUserAppointmentT
	name: string
	specialization?: string
	userId?: string
}

export const RecordInfo = ({ info, name, specialization, userId }: RecordInfoPropsT) => {
	const dispatch = useAppDispatch()
	const [textDate, textTime] = useParseDate(info.fullDateISO, {
		count: 30,
		what: 'minutes',
	})

	function answering(type: StatusAppointmentT) {
		if (!userId) return

		dispatch(doctorAnswer({ userId: userId, appointmentId: info.id, type }))
	}

	return (
		<div className={s['wrapper']}>
			<div>
				<h4 className={s['title']}>{name}</h4>
				{specialization && <p className={s['additional']}>{specialization}</p>}
			</div>

			{textDate && textTime && <TimeInfo textDate={textDate} textTime={textTime} />}

			{info?.status && (
				<div className={clsx(s['status'], s[info.status])}>
					<RequireRights requiredRights='admin'>
						{convertStatusForDoctor(info.status)}
					</RequireRights>
					<RequireRights requiredRights='user'>
						{convertStatusForUser(info.status)}
					</RequireRights>
				</div>
			)}
			{info.status === 'expired' && (
				<button
					className={s['btn-delete']}
					onClick={() => {
						dispatch(deleteAppointment(info.id))
					}}
				>
					<img src={closeImg} />
				</button>
			)}
			<RequireRights requiredRights='admin'>
				{info.status === 'enrolled' && (
					<div className={s['functional-btns-wrapper']}>
						<button
							className={clsx(s['functional-btn'], s['accept'])}
							onClick={() => {
								answering('admitted')
							}}
						>
							Пациент принят
						</button>
						<button
							className={clsx(s['functional-btn'], s['cancel'])}
							onClick={() => {
								answering('not-admitted')
							}}
						>
							Пациент не пришел
						</button>
					</div>
				)}
			</RequireRights>
		</div>
	)
}
