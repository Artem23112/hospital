import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getAuthErrorInfo } from '../../../../assets/functions/getAuthErrorInfo'

export const signIn = createAsyncThunk(
	'authentication/signIn',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				getAuth(),
				email,
				password
			)

			return {
				email: userCredential.user.email,
				id: userCredential.user.uid
			}
		} catch (err: any) {
			return rejectWithValue({
				error: getAuthErrorInfo(err.code)
			})
		}
	}
)
