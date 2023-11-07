import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import appointmentsSliceReducer from './slices/appointments-slice/appointmentsSlice'
import authenticationReducer from './slices/authentication-slice/authenticationSlice'
import popupMessagesReducer from './slices/popupMessages-slice/popupMessagesSlice'
import { authMiddleware } from './middlewares/initAuth'

const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		appointment: appointmentsSliceReducer,
		popupMessage: popupMessagesReducer
	},
	devTools: true
	// middleware: getDefaultMiddleware => [
	// 	...getDefaultMiddleware(),
	// 	authMiddleware
	// ]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
