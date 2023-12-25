import { useAppSelector } from '../../../redux/store'
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface IRequireAuthProps {
	children: ReactNode
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
	const isAuth = useAppSelector(state => state.authentication.isAuth)

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}
	return <>{children}</>
}
