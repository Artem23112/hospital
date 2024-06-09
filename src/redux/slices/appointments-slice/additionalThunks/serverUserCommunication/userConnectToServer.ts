import { userSubscribeToAppointments } from '@/components/utils/functions/user-subscriptions'
import { AppDispatch } from '@/redux/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import {
	DoctorInfoT,
	doctorsInfoFromServer,
} from '../serverDoctorCommunication/types'

export const userConnectToServer = createAsyncThunk(
	'appointments/userConnectToServer',
	async (userId: string, { dispatch, rejectWithValue }) => {
		userSubscribeToAppointments(dispatch as AppDispatch, userId)

		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo: unknown = (await get(doctorsInfoPath)).val()
		if (!doctorsInfoFromServer.guard(doctorsInfo)) {
			return rejectWithValue('unknown type info about doctors')
		}

		return arrFromFirebaseObj<DoctorInfoT>(doctorsInfo)
	}
)
