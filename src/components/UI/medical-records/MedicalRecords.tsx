import { MedicalRecord } from '@/components/UI/medical-records/MedicalRecord'
import { useAppSelector } from '@/redux/store'
import { getDoctorInfoById } from '@/shared/utils/functions/get/getDoctorInfoById'
import type { FC } from 'react'
import s from './MedicalRecords.module.scss'

type PropsT = { patientId: string }

export const MedicalRecords: FC<PropsT> = ({}) => {
	const medicalCard = useAppSelector(state => state.doctorSlice.medicalCard)
	const doctorsInfo = useAppSelector(state => state.doctorSlice.doctorsInfo)

	return (
		<div className={s['container']}>
			{medicalCard.map(record => {
				const doctorInfo = getDoctorInfoById(doctorsInfo, record.doctorId)

				return (
					<MedicalRecord
						key={record.id}
						record={record}
						doctorInfo={doctorInfo}
					/>
				)
			})}
		</div>
	)
}
