import { HTMLComponent } from '@/components/utility-components/HTMLComponent'
import {
	UniqueDoctorInfoT,
	UniqueMedicalRecordT,
} from '@/redux/slices/doctorSlice/serverDoctorCommunication/types'
import type { FC } from 'react'
import s from './MedicalRecords.module.scss'

type PropsT = {
	record: UniqueMedicalRecordT
	doctorInfo?: UniqueDoctorInfoT
}

export const MedicalRecord: FC<PropsT> = ({ record, doctorInfo }) => {
	return (
		<div className={s['record']} key={record.id}>
			<div className={s['report-header']}>
				<h4 className={s['name']}>{doctorInfo?.name}</h4>
				<h5 className={s['additional']}>{doctorInfo?.specialization}</h5>
			</div>
			<HTMLComponent
				className={s['html-wrapper']}
				htmlContent={record.record}
			></HTMLComponent>
		</div>
	)
}
