import {
	convertStatusForDoctor,
	convertStatusForUser,
} from '@/assets/functions/convert-appointment-status'
import { RequireRights } from '@/components/HOC/access-restrictions/RequireRights'
import { StatusAppointmentT } from '@/redux/slices/appointments-slice/types'
import clsx from 'clsx'
import { FC } from 'react'
import s from './index.module.scss'

type StatusPropsT = {
	status: StatusAppointmentT
}

export const Status: FC<StatusPropsT> = ({ status }) => {
	return (
		<div className={clsx(s['status'], s[status])}>
			<RequireRights requiredRights='admin'>
				{convertStatusForDoctor(status)}
			</RequireRights>
			<RequireRights requiredRights='user'>{convertStatusForUser(status)}</RequireRights>
		</div>
	)
}
