import {
	DoctorInfoT,
	doctorsInfoFromServer,
} from '@/redux/slices/doctorSlice/serverDoctorCommunication/types'
import { AppDispatch } from '@/redux/store'
import {
	doctorSubscribeToAppointments,
	doctorSubscribeToOwnPatients,
} from '@/shared/utils/functions/subscriptions/doctor-subscriptions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../shared/utils/functions/convert/array-from-firebase-object'
import {
	UserInfoT,
	usersInfoFromServer,
} from '../../patient-slice/additionalThunks/serverPatientCommunication/types'

export const doctorConnectToServer = createAsyncThunk(
	'doctorSlice/doctorConnectToServer',
	async (doctorId: string, { dispatch, rejectWithValue }) => {
		doctorSubscribeToAppointments(dispatch as AppDispatch, doctorId)
		doctorSubscribeToOwnPatients(dispatch as AppDispatch, doctorId)

		const usersInfoPath = ref(getDatabase(), 'users-info')
		const usersInfo: unknown = (await get(usersInfoPath)).val()
		if (!usersInfoFromServer.guard(usersInfo)) {
			return rejectWithValue('unknown type info about users')
		}
		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo: unknown = (await get(doctorsInfoPath)).val()

		if (!doctorsInfoFromServer.guard(doctorsInfo)) return rejectWithValue('')

		return {
			usersInfo: arrFromFirebaseObj<UserInfoT>(usersInfo),
			doctorsInfo: arrFromFirebaseObj<DoctorInfoT>(doctorsInfo),
		}
	}
)
