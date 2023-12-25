import { FC, ReactNode } from 'react'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { useAppSelector } from '../../../redux/store'

interface IRequireRightsProps {
	requiredRights: Exclude<IAuthInitialState['rights'], null>
	children: ReactNode
}

export const RequireRights: FC<IRequireRightsProps> = ({
	requiredRights,
	children
}) => {
	const currentRights = useAppSelector(state => state.authentication.rights)
	return <>{requiredRights === currentRights && <>{children}</>}</>
}
