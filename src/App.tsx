import { Unsubscribe } from 'firebase/auth'
import { FC, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { RequireAuth } from './components/HOC/RequireAuth/RequireAuth'
import { subscribeToUserAvailability } from './firebase/subscribe-to-user-availability'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SignUpPage } from './pages/SignUpPage/SignUpPage'
import { PATHS } from './paths'
import { connectToServer } from './redux/slices/authentication-slice/additionalThunks/connectToServer'
import { useAppDispatch, useAppSelector } from './redux/store'

interface IAppProps {}

export const App: FC<IAppProps> = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { isAuth, rights } = useAppSelector(({ authentication }) => ({
		isAuth: authentication.isAuth,
		rights: authentication.rights
	}))

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
	}, [isAuth])

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
