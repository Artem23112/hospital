import clsx from 'clsx'
import s from './CentredContainer.module.scss'
import { FC } from 'react'

interface IProps {
	children: React.ReactNode
	className?: string
}

const CentredContainer: FC<IProps> = ({ children, className }) => {
	return <div className={clsx(s['container'], className)}>{children}</div>
}

export default CentredContainer
