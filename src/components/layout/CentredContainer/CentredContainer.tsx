import clsx from 'clsx'
import { FC } from 'react'
import s from './CentredContainer.module.scss'

interface ICentredContainerProps {
	children: React.ReactNode
	className?: string
}

const CentredContainer: FC<ICentredContainerProps> = ({
	children,
	className
}) => {
	return <div className={clsx(s['container'], className)}>{children}</div>
}

export default CentredContainer
