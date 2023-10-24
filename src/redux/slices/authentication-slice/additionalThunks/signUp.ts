import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuthErrorInfo } from '../../../../assets/functions/getAuthErrorInfo'

export const signUp = createAsyncThunk(
	'authentication/signUp',
	async (
		{
			email,
			password,
			name
		}: { email: string; password: string; name: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				getAuth(),
				email,
				password
			)

			await set(
				ref(getDatabase(), `users-info/${userCredential.user.uid}/rights`),
				'user'
			)
			await set(
				ref(getDatabase(), `users-info/${userCredential.user.uid}/name`),
				name
			)

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
