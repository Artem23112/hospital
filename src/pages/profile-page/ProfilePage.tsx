import { RequireRights } from '../../components/HOC/access-restrictions/RequireRights'
import { DoctorProfile } from '../../components/layout/doctor-profile/DoctorProfile'
import { UserProfile } from '../../components/layout/user-profile/UserProfile'

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
