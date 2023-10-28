import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useAppSelector } from '../../../redux/store'
import Tabs from '../../UI/Tabs/Tabs'
import CentredContainer from '../CentredContainer/CentredContainer'
import DoctorAppointmentList from '../DoctorAppointmentList/DoctorAppointmentList'
import Header from '../Header/Header'

const AdminPanel = () => {
	const doctorAppointments = useAppSelector(
		state => state.appointment.doctorAppointments
	)

	let tabsConfig = [
		{
			id: v4(),
			tabText: 'Список записей',
			linkPath: '/profile/appointment-list',
			routePath: '/appointment-list',
			component: (
				<DoctorAppointmentList doctorAppointments={doctorAppointments} />
			)
		},
		{
			id: v4(),
			linkPath: '',
			routePath: '/',
			component: <Navigate to='./appointment-list' />,
			default: true
		}
	]

	return (
		<>
			<Header title='Добро пожаловать' />
			<CentredContainer>
				<Tabs tabsConfig={tabsConfig} />
			</CentredContainer>
		</>
	)
}

export default AdminPanel
