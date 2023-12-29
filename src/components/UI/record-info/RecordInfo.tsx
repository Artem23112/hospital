import clsx from 'clsx'
import {
	convertStatusForDoctor,
	convertStatusForUser,
} from '../../../assets/functions/convert-appoinment-status'
import closeImg from '../../../assets/images/icons/close.svg'
import { useParseDate } from '../../../hooks/useParseDate'
import { deleteAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/deleteAppointment'
import { doctorAnswer } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/doctorAnswer'
import { UniqueDoctorAppointmentT } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { UniqueUserAppointmentT } from '../../../redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { StatusAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppDispatch } from '../../../redux/store'
import { RequireRights } from '../../HOC/access-restrictions/RequireRights'
import { TimeInfo } from '../../UI/time-info/TimeInfo'
import s from './RecordInfo.module.scss'

type RecordInfoPropsT = {
	info: (UniqueDoctorAppointmentT | UniqueUserAppointmentT) & {
		name: string | undefined
		specialization?: string
	}
	userId?: string
}

export const RecordInfo = ({ info, userId }: RecordInfoPropsT) => {
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
				<h4 className={s['title']}>{info.name}</h4>
				{info?.specialization && <p className={s['additional']}>{info.specialization}</p>}
			</div>

			{textDate && textTime && <TimeInfo textDate={textDate} textTime={textTime} />}

			{info?.status && (
				<div className={clsx(s['status'], s[info.status])}>
					<RequireRights requiredRights='admin'>
						{convertStatusForDoctor(info.status)}
					</RequireRights>
					<RequireRights requiredRights='user'>{convertStatusForUser(info.status)}</RequireRights>
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
