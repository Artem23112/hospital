import { RequireRights } from '@/components/HOC/access-restrictions/RequireRights'
import { StatusAppointmentT } from '@/redux/slices/patient-slice/types'
import {
	convertStatusForDoctor,
	convertStatusForUser,
} from '@/shared/utils/functions/convert/convert-appointment-status'
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
			<RequireRights requiredRights='user'>
				{convertStatusForUser(status)}
			</RequireRights>
		</div>
	)
}
