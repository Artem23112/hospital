import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './AlternativeChoice.module.scss'

interface IAlternativeChoice {
	contentText: string
	linkText: string
	redirectPath: string
	handleClick: () => void
}

export const AlternativeChoice: FC<IAlternativeChoice> = ({
	contentText,
	linkText,
	redirectPath,
	handleClick
}) => {
	return (
		<p className={s['wrapper']}>
			{contentText}
			<Link to={redirectPath} onClick={handleClick}>
				{linkText}
			</Link>
		</p>
	)
}
