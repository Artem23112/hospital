import { Tabs } from '@/components/UI/tabs/Tabs'
import { PATHS } from '@/paths'
import { useAppSelector } from '@/redux/store'
import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { CentredContainer } from '../centred-container/CentredContainer'
import { Header } from '../header/Header'
import { MakeAppointmentPanel } from '../make-appointment-panel/MakeAppointmentPanel'
import { OwnAppointmentList } from '../own-appointment-list/OwnAppointmentList'

export const UserProfile = () => {
	const appointmentList = useAppSelector(
		state => state.appointment.userAppointments
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
			component: <OwnAppointmentList userAppointments={appointmentList} />,
		},
		{
			id: 3,
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
