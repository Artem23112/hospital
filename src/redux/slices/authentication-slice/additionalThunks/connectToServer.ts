import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { doctorConnectToServer } from '../../appointments-slice/additionalThunks/serverDoctorCommunication/doctorConnectToServer'
import { userConnectToServer } from '../../appointments-slice/additionalThunks/serverUserCommunication/userConnectToServer'
import { IAuthInitialState } from '../types'

interface fulfilledPayload {
	rights: IAuthInitialState['rights']
}

export const connectToServer = createAsyncThunk(
	'authentication/connect',
	async (uid: string, { dispatch, rejectWithValue }) => {
		try {
			const info = (await get(ref(getDatabase(), `doctors-info/${uid}`))).val()

			if (info) {
				dispatch(doctorConnectToServer(uid))
			} else {
				dispatch(userConnectToServer(uid))
			}

			return { rights: info ? 'admin' : 'user' } as fulfilledPayload
		} catch (err: any) {
			return rejectWithValue(err.code)
		}
	}
)
