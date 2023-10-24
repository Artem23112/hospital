import { FC } from 'react'
import s from './Loader.module.scss'

interface IProps {
	size: number
	color: string
}

const Loader: FC<IProps> = ({ size, color }) => {
	const styles = {
		width: `${size}px`,
		height: `${size}px`,
		borderWidth: `${Math.floor(size / 10)}px`,
		borderColor: color,
		borderBottomColor: 'transparent'
	}

	return <span className={s['loader']} style={styles}></span>
}

export default Loader
