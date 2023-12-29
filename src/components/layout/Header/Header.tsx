import { RequireAuth } from '@/components/HOC/access-restrictions/RequireAuth'
import { ProfileBtn } from '@/components/UI/profile-btn/ProfileBtn'
import { CentredContainer } from '../centred-container/CentredContainer'
import s from './Header.module.scss'

type HeaderPropsT = {
	title: string
}

export const Header = ({ title }: HeaderPropsT) => {
	return (
		<div className={s['header']}>
			<CentredContainer>
				<div className={s['header-content']}>
					<h2 className={s['header-title']}>{title}</h2>
					<RequireAuth>
						<ProfileBtn />
					</RequireAuth>
				</div>
			</CentredContainer>
		</div>
	)
}
