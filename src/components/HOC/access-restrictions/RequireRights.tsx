import { ReactNode } from 'react'
import { Roles } from '@/main-types'
import { useAppSelector } from '@/redux/store'

interface IRequireRightsProps {
	requiredRights: Roles
	children: ReactNode
}

export const RequireRights = ({ requiredRights, children }: IRequireRightsProps) => {
	const currentRights = useAppSelector(state => state.authentication.rights)
	return <>{requiredRights === currentRights && <>{children}</>}</>
}
