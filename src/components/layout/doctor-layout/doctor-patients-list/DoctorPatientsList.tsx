import { useSearch } from '@/components/layout/doctor-layout/doctor-patients-list/useSearch'
import { InfoCard } from '@/components/UI/info-card-compound/InfoCard'
import { useAppSelector } from '@/redux/store'
import { getPatientInfoById } from '@/shared/utils/functions/get/getPatientInfoById'
import { Link } from 'react-router-dom'
import s from './DoctorPatientsList.module.scss'

export const DoctorPatientsList  = () => {
	const doctorPatients = useAppSelector(
		state => state.doctorSlice.doctorPatients
	)
	const patientsInfo = useAppSelector(state => state.doctorSlice.usersInfo)
	const { filteredData, searchName, setSearchName } = useSearch({
		data: doctorPatients,
		patientsInfo,
	})
	
	return (
		<>
			<input
				className={s['search-input']}
				type='text'
				value={searchName}
				onChange={e => setSearchName(e.target.value)}
				placeholder='Введите имя пациента'
			/>
			
			
			<ul className={s['list']}>
				{filteredData.map(patientId => {
					const patientInfo = getPatientInfoById(patientsInfo, patientId)
					if (!patientInfo) return null

					return (
						<li key={patientId}>
							<Link
								className={s['link']}
								to={`/profile/my-patients/${patientId}`}
							>
								<InfoCard className={s['card']}>
									<InfoCard.About
										className={s['about']}
										name={patientInfo.name}
									/>
								</InfoCard>
							</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}