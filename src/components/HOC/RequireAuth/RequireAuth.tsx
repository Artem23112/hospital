import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import {  useAppSelector } from '../../../redux/store'

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const isAuth = useAppSelector<boolean>(
		(state) => state.authentication.isAuth
	)

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}
	return <>{children}</>
}

export default RequireAuth
