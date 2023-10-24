import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import appointmentsSliceReducer from './slices/appointments-slice/appointmentsSlice'
import authenticationReducer from './slices/authentication-slice/authenticationSlice'
import popupMessagesReducer from './slices/popupMessages-slice/popupMessagesSlice'

const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		appointment: appointmentsSliceReducer,
		popupMessage: popupMessagesReducer
	},
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: <T>(arg: (state: RootState) => T) => T =
	useSelector

export default store
