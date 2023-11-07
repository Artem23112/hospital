import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuthErrorInfo } from '../../../../assets/functions/get-auth-error-info'
import { userConnectToServer } from '../../appointments-slice/additionalThunks/serverUserCommunication/userConnectToServer'

export const signUp = createAsyncThunk(
	'authentication/signUp',
	async (
		{
			email,
			password,
			name
		}: { email: string; password: string; name: string },
		{ rejectWithValue, dispatch }
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				getAuth(),
				email,
				password
			)
			const id = userCredential.user.uid

			await set(ref(getDatabase(), `users-info/${id}/rights`), 'user')
			await set(ref(getDatabase(), `users-info/${id}/name`), name)

			dispatch(userConnectToServer(id))

			return {
				email: userCredential.user.email,
				id: userCredential.user.uid
			}
		} catch (err: any) {
			return rejectWithValue({
				error: { ...getAuthErrorInfo(err.code), page: '/signup' }
			})
		}
	}
)
