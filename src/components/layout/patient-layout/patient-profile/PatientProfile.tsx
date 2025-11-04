import { Tabs } from '@/components/UI/tabs/Tabs'
import { PatientMedicalCard } from '@/components/layout/patient-layout/patient-medical-card/PatientMedicalCard'
import { useAppSelector } from '@/redux/store'
import { PATHS } from '@/shared/constants/paths'
import { Navigate } from 'react-router-dom'
import { CentredContainer } from '../../../utility-components/centred-container/CentredContainer'
import { Header } from '../../header/Header'
import { MakeAppointmentPanel } from '../make-appointment-panel/MakeAppointmentPanel'
import { PatientAppointmentList } from '../patient-appointment-list/PatientAppointmentList'

export const PatientProfile = () => {
	const appointmentList = useAppSelector(
		state => state.patientSlice.userAppointments
	)

	const tabsConfig = [
		{
			id: 1,
			tabText: 'Записаться',
			linkPath: PATHS.profile.home + PATHS.profile.makeAppointment,
			routePath: PATHS.profile.makeAppointment,
			component: <MakeAppointmentPanel />,
		},
		{
			id: 2,
			tabText: 'Список записей',
			linkPath: PATHS.profile.home + PATHS.profile.appointmentList,
			routePath: PATHS.profile.appointmentList,
			component: <PatientAppointmentList userAppointments={appointmentList} />,
		},
		{
			id: 3,
			tabText: 'Медицинская карта',
			linkPath: PATHS.profile.home + 'my-medical-card',
			routePath: '/my-medical-card',
			component: <PatientMedicalCard />,
		},
		{
			id: 4,
			linkPath: '',
			routePath: '/',
			component: <Navigate to={PATHS.profile.makeAppointment} />,
			default: true,
		},
	]

	return (
		<>
			<Header title='Запишитесь на прием' />
			<CentredContainer>
				<Tabs tabsConfig={tabsConfig} />
			</CentredContainer>
		</>
	)
}
