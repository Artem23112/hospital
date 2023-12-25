import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useAppSelector } from '../../../redux/store'
import { Tabs } from '../../UI/Tabs/Tabs'
import { CentredContainer } from '../CentredContainer/CentredContainer'
import { Header } from '../Header/Header'
import { MakeAppointmentPanel } from '../MakeAppointmentPanel/MakeAppointmentPanel'
import { PATHS } from '../../../paths'
import { OwnAppointmentList } from '../own-appointment-list/OwnAppointmentList'

export const UserProfile = () => {
	const appointmentList = useAppSelector(
		state => state.appointment.userAppointments
	)

	const tabsConfig = [
		{
			id: v4(),
			tabText: 'Записаться',
			linkPath: PATHS.profile.home + PATHS.profile.makeAppointment,
			routePath: PATHS.profile.makeAppointment,
			component: <MakeAppointmentPanel />
		},
		{
			id: v4(),
			tabText: 'Список записей',
			linkPath: PATHS.profile.home + PATHS.profile.appointmentList,
			routePath: PATHS.profile.appointmentList,
			component: <OwnAppointmentList userAppointments={appointmentList} />
		},
		{
			id: v4(),
			linkPath: '',
			routePath: '/',
			component: <Navigate to={PATHS.profile.makeAppointment} />,
			default: true
		}
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
