import { RootState } from '@/redux/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { doctorConnectToServer } from '../../appointments-slice/additionalThunks/serverDoctorCommunication/doctorConnectToServer'
import { userConnectToServer } from '../../appointments-slice/additionalThunks/serverUserCommunication/userConnectToServer'

export const connectToServer = createAsyncThunk(
	'authentication/connect',
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState
			const uid = state.authentication.id
			if (!uid) throw new Error('Пользователь не авторизован')

			const info = await get(ref(getDatabase(), `doctors-info/${uid}`))

			if (info.exists()) {
				dispatch(doctorConnectToServer(uid))
				return 'admin'
			} else {
				dispatch(userConnectToServer(uid))
				return 'user'
			}
		} catch (err: any) {
			return rejectWithValue(err.code)
		}
	}
)
