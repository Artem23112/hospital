import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import RequireAuth from './components/HOC/RequireAuth/RequireAuth'
import LoginPage from './components/pages/LoginPage/LoginPage'
import ProfilePage from './components/pages/ProfilePage/ProfilePage'
import SignUpPage from './components/pages/SignUpPage/SignUpPage'
import PopupMessages from './components/utils/PopupMessages/PopupMessages'
import { setSavedUser } from './redux/slices/authentication-slice/authenticationSlice'
import { useAppDispatch } from './redux/store'

function App() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), user => {
			if (!user) return

			dispatch(
				setSavedUser({
					email: user.email,
					id: user.uid
				})
			)
			navigate('/profile')
		})

		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<>
			<PopupMessages />

			<Routes>
				<Route
					path='/profile/*'
					element={
						<RequireAuth>
							<ProfilePage />
						</RequireAuth>
					}
				/>
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<Navigate to={'/login'} />}></Route>
			</Routes>
		</>
	)
}

export default App
