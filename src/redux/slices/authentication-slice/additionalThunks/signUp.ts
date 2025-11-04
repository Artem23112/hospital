import { patientConnectToServer } from '@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/patientConnectToServer'
import { getAuthErrorInfo } from '@/shared/utils/functions/get/get-auth-error-info'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { SignUpInfoT } from '../types'

export const signUp = createAsyncThunk(
	'authentication/signUp',
	async (
		{ email, password, name }: SignUpInfoT,
		{ rejectWithValue, dispatch }
	) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				getAuth(),
				email,
				password
			)
			const id = user.uid

			await set(ref(getDatabase(), `users-info/${id}/rights`), 'user')
			await set(ref(getDatabase(), `users-info/${id}/name`), name)

			dispatch(patientConnectToServer(id))

			return {
				email: user.email,
				id,
			}
		} catch (err: any) {
			return rejectWithValue({
				error: { ...getAuthErrorInfo(err.code), page: '/signup' },
			})
		}
	}
)
