import { FC } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { UniqueUserAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { useAppSelector } from '../../../redux/store'
import s from './Tabs.module.scss'
import clsx from 'clsx'

interface IProps {
	tabsConfig: TabConfigT[]
}

const Tabs: FC<IProps> = ({ tabsConfig }) => {
	const { pathname } = useLocation()

	function isActive(link: string): boolean {
		return link === pathname
	}

	return (
		<>
			<ul className={s['tab-list']}>
				{tabsConfig.map(tab => {
					if (tab?.default) return
					return (
						<li
							className={clsx(s['tab'], {
								[s['active']]: isActive(tab.linkPath)
							})}
							key={tab.id}
						>
							<Link to={tab.linkPath}>{tab?.tabText}</Link>
						</li>
					)
				})}
			</ul>
			<div className={s['shadow']}>
				<Routes>
					{tabsConfig.map(tab => {
						return (
							<Route
								path={tab?.routePath}
								element={tab.component}
								key={tab.id}
							/>
						)
					})}
				</Routes>
			</div>
		</>
	)
}

type TabConfigT = {
	id: string
	default?: boolean
	tabText?: string
	linkPath: string
	routePath: string
	component: JSX.Element
}

export default Tabs