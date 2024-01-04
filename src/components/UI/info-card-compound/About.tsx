import { FC } from 'react'
import s from './index.module.scss'

type AboutPropsT = {
	name: string
	specialization?: string
}

export const About: FC<AboutPropsT> = ({ name, specialization }) => {
	return (
		<div>
			<h4 className={s['title']}>{name}</h4>
			{specialization && <p className={s['additional']}>{specialization}</p>}
		</div>
	)
}
