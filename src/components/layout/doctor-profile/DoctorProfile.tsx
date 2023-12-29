import { Navigate } from 'react-router-dom'
import { DoctorWorkspace } from '../doctor-workspace/DoctorWorkspace'
import { Header } from '../header/Header'
import { CentredContainer } from '../centred-container/CentredContainer'
import { useAppSelector } from '@/redux/store'
import { Tabs } from '@/components/UI/tabs/Tabs'
import { v4 } from 'uuid'

export const DoctorProfile = () => {
	const doctorAppointments = useAppSelector(state => state.appointment.doctorAppointments)

	let tabsConfig = [
		{
			id: v4(),
			tabText: 'Список записей',
			linkPath: '/profile/appointment-list',
			routePath: '/appointment-list',
			component: <DoctorWorkspace doctorAppointments={doctorAppointments} />,
		},
		{
			id: v4(),
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
