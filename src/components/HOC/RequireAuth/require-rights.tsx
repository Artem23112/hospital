import { FC, ReactElement } from 'react'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { useAppSelector } from '../../../redux/store'

interface IRequireRightsProps {
	requiredRights: Exclude<IAuthInitialState['rights'], null>
	children: ReactElement
}

export const RequireRights: FC<IRequireRightsProps> = ({
	requiredRights,
	children
}) => {
	const currentRights = useAppSelector(state => state.authentication.rights)
	return <>{requiredRights === currentRights && <div>{children}</div>}</>
}
