import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/store'

interface IRequireAuthProps {
	children: ReactNode
}

const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
	const isAuth = useAppSelector<boolean>(state => state.authentication.isAuth)

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}
	return <>{children}</>
}

export default RequireAuth
