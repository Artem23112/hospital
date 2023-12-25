import { Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { RequireAuth } from './components/HOC/access-restrictions/RequireAuth'
import { subscribeToUserAvailability } from './firebase/subscribe-to-user-availability'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SignUpPage } from './pages/SignUpPage/SignUpPage'
import { PATHS } from './paths'
import { connectToServer } from './redux/slices/authentication-slice/additionalThunks/connectToServer'
import { useAppDispatch, useAppSelector } from './redux/store'

export const App = () => {
	const dispatch = useAppDispatch()
	const { isAuth, rights } = useAppSelector(({ authentication }) => ({
		isAuth: authentication.isAuth,
		rights: authentication.rights
	}))
	const navigate = useNavigate()

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined

		if (isAuth && rights === null) {
			dispatch(connectToServer())
			navigate(PATHS.profile.home)
		} else {
			unsubscribe = subscribeToUserAvailability(dispatch)
		}

		return () => {
			unsubscribe?.()
		}
	}, [isAuth, rights])

	return (
		<>
			<Routes>
				<Route path={PATHS.home} element={<Navigate to={PATHS.login} />} />
				<Route path={PATHS.login} element={<LoginPage />} />
				<Route path={PATHS.singUp} element={<SignUpPage />} />
				<Route
					path={`${PATHS.profile.home}*`}
					element={
						<RequireAuth>
							<ProfilePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</>
	)
}
