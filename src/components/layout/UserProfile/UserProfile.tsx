import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { UniqueUserAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import Tabs from '../../UI/Tabs/Tabs'
import AppointmentList from '../AppointmentList/AppointmentList'
import CentredContainer from '../CentredContainer/CentredContainer'
import Header from '../Header/Header'
import MakeAppointmentPanel from '../MakeAppointmentPanel/MakeAppointmentPanel'

const UserProfile = () => {
	const appointmentList = useAppSelector<UniqueUserAppointmentT[]>(
		state => state.appointment.userAppointments
	)

	const tabsConfig = [
		{
			id: v4(),
			tabText: 'Записаться',
			linkPath: '/profile/make-appointment',
			routePath: '/make-appointment',
			component: <MakeAppointmentPanel />
		},
		{
			id: v4(),
			tabText: 'Список записей',
			linkPath: '/profile/appointment-list',
			routePath: '/appointment-list',
			component: <AppointmentList userAppointments={appointmentList} />
		},
		{
			id: v4(),
			linkPath: '',
			routePath: '/',
			component: <Navigate to='./make-appointment' />,
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

export default UserProfile
