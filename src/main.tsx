import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage'
import { PopupMessages } from './components/utils/PopupMessages/PopupMessages'
import './firebase'
import './index.css'
import { PATHS } from './paths'
import store from './redux/store'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage'

const router = createBrowserRouter([
	{ path: PATHS.home, element: <Navigate to='/login' /> },
	{ path: PATHS.login, element: <LoginPage /> },
	{ path: PATHS.singUp, element: <SignUpPage /> },
	{ path: PATHS.profile.home, element: <ProfilePage /> }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PopupMessages />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
