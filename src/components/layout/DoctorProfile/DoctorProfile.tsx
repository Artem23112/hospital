import { v4 } from 'uuid'
import { UniqueDoctorAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import Tabs from '../../UI/Tabs/Tabs'
import CentredContainer from '../CentredContainer/CentredContainer'
import Header from '../Header/Header'
import s from './DoctorProfile.module.scss'
import { Navigate } from 'react-router-dom'
import DoctorAppointmentList from '../DoctorAppointmentList/DoctorAppointmentList'

const AdminPanel = () => {
	const doctorAppointments = useAppSelector<UniqueDoctorAppointmentT[]>(
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
		<div className={s['admin-panel']}>
			<Header title='Добро пожаловать' />
			<CentredContainer>
				<Tabs tabsConfig={tabsConfig} />
			</CentredContainer>
		</div>
	)
}

export default AdminPanel
