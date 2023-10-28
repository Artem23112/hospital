import { FC } from 'react'
import { ProfileBtn } from '../../UI/ProfileBtn/ProfileBtn'
import { CentredContainer } from '../CentredContainer/CentredContainer'
import s from './Header.module.scss'

interface IHeaderProps {
	title: string
}

export const Header: FC<IHeaderProps> = ({ title }) => {
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
