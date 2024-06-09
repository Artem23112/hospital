import { doctorSubscribeToAppointments } from '@/components/utils/functions/doctor-subscriptions'
import { AppDispatch } from '@/redux/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import {
	UserInfoT,
	usersInfoFromServer,
} from '../serverUserCommunication/types'

export const doctorConnectToServer = createAsyncThunk(
	'appointments/adminConnectToServer',
	async (doctorId: string, { dispatch, rejectWithValue }) => {
		doctorSubscribeToAppointments(dispatch as AppDispatch, doctorId)

		const usersInfoPath = ref(getDatabase(), 'users-info')
		const usersInfo: unknown = (await get(usersInfoPath)).val()
		if (!usersInfoFromServer.guard(usersInfo)) {
			return rejectWithValue('unknown type info about users')
		}

		return arrFromFirebaseObj<UserInfoT>(usersInfo)
	}
)
