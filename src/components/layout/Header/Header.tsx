import { ProfileBtn } from '../../UI/profile-btn/ProfileBtn'
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
					<ProfileBtn />
				</div>
			</CentredContainer>
		</div>
	)
}
