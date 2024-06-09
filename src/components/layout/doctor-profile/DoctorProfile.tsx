import { Tabs } from '@/components/UI/tabs/Tabs'
import { useAppSelector } from '@/redux/store'
import { Navigate } from 'react-router-dom'
import { CentredContainer } from '../centred-container/CentredContainer'
import { DoctorWorkspace } from '../doctor-workspace/DoctorWorkspace'
import { Header } from '../header/Header'

export const DoctorProfile = () => {
	const doctorAppointments = useAppSelector(
		state => state.appointment.doctorAppointments
	)

	let tabsConfig = [
		{
			id: 1,
			tabText: 'Список записей',
			linkPath: '/profile/appointment-list',
			routePath: '/appointment-list',
			component: <DoctorWorkspace doctorAppointments={doctorAppointments} />,
		},
		{
			id: 2,
			tabText: 'Мои пациенты',
			linkPath: '/profile/my-patients',
			routePath: '/my-patients',
			component: <div>Temp</div>,
		},
		{
			id: 3,
			linkPath: '',
			routePath: '/',
			component: <Navigate to='./appointment-list' />,
			default: true,
		},
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
