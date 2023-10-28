import clsx from 'clsx'
import { FC } from 'react'
import { convertStatus } from '../../../assets/functions/convertStatus'
import closeImg from '../../../assets/images/icons/close.svg'
import { useParseDate } from '../../../hooks/useParseDate'
import { deleteAppointment } from '../../../redux/slices/appointments-slice/additionalThunks/deleteAppointment'
import { doctorAnswer } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/doctorAnswer'
import { StatusAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppDispatch } from '../../../redux/store'
import s from './InfoButton.module.scss'

interface IInfoButtonProps {
	isSelected?: boolean
	id: string
	info: InfoT
	handleClick?: (arg: string) => void
}

export const InfoButton: FC<IInfoButtonProps> = ({
	id,
	isSelected,
	info,
	handleClick
}) => {
	const dispatch = useAppDispatch()
	const [textDate, textTime] = useParseDate(info?.fullDateISO, {
		count: 30,
		what: 'minutes'
	})

	function answering(type: StatusAppointmentT) {
		if (!info?.userId || !info?.id) return

		dispatch(
			doctorAnswer({ userId: info.userId, appointmentId: info.id, type })
		)
	}

	return (
		<div className={s['btn-wrapper']}>
			<button
				className={clsx(s['btn'], {
					[s['active']]: isSelected
				})}
				type='button'
				onClick={() => {
					handleClick && handleClick(id)
				}}
			>
				<div>
					<h4 className={s['title']}>{info?.name}</h4>
					{info?.specialization && (
						<p className={s['additional']}>{info.specialization}</p>
					)}
				</div>

				<div className={s['time']}>
					<span>{info?.fullDateISO ? textDate : 'Пн - Сб'}</span>
					<span>{info?.fullDateISO ? textTime : '8:00 - 17:00'}</span>
				</div>

				{info?.status && (
					<div className={clsx(s['status'], s[info.status])}>
						{convertStatus(info.status)}
					</div>
				)}
			</button>
			{info.status === 'canceled' && (
				<button
					className={s['btn-delete']}
					onClick={() => {
						dispatch(deleteAppointment(id))
					}}
				>
					<img src={closeImg} />
				</button>
			)}
			{info.userId && info?.status === 'waiting' && (
				<div className={s['functional-btns-wrapper']}>
					<button
						className={clsx(s['functional-btn'], s['accept'])}
						onClick={() => {
							answering('accepted')
						}}
					>
						Принять
					</button>
					<button
						className={clsx(s['functional-btn'], s['cancel'])}
						onClick={() => {
							answering('canceled')
						}}
					>
						Отклонить
					</button>
				</div>
			)}
		</div>
	)
}

type InfoT = {
	name?: string
	specialization?: string
	status?: StatusAppointmentT
	id?: string
	doctorId?: string
	userId?: string
	fullDateISO?: string
}
