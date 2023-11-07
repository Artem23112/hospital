import { RequireRights } from '../../components/HOC/RequireAuth/require-rights'
import { DoctorProfile } from '../../components/layout/DoctorProfile/DoctorProfile'
import { UserProfile } from '../../components/layout/UserProfile/UserProfile'

const ProfilePage = () => {
	return (
		<div>
			<RequireRights requiredRights='user'>
				<UserProfile />
			</RequireRights>
			<RequireRights requiredRights='admin'>
				<DoctorProfile />
			</RequireRights>
		</div>
	)
}

export { ProfilePage }
