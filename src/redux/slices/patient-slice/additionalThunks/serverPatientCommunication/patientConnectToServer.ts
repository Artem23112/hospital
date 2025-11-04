import { getMedicalCard } from '@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/getMedicalCard'
import { AppDispatch } from '@/redux/store'
import { userSubscribeToAppointments } from '@/shared/utils/functions/subscriptions/patient-subscriptions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../shared/utils/functions/convert/array-from-firebase-object'
import {
	DoctorInfoT,
	doctorsInfoFromServer,
} from '../../../doctorSlice/serverDoctorCommunication/types'

export const patientConnectToServer = createAsyncThunk(
	'patientSlice/patientConnectToServer',
	async (userId: string, { dispatch, rejectWithValue }) => {
		userSubscribeToAppointments(dispatch as AppDispatch, userId)
		dispatch(getMedicalCard())

		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo: unknown = (await get(doctorsInfoPath)).val()
		if (!doctorsInfoFromServer.guard(doctorsInfo)) {
			return rejectWithValue('unknown type info about doctors')
		}

		return arrFromFirebaseObj<DoctorInfoT>(doctorsInfo)
	}
)
