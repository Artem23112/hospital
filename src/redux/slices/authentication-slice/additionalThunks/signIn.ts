import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getAuthErrorInfo } from '../../../../assets/functions/get-auth-error-info'
import { connectToServer } from './connectToServer'

export const signIn = createAsyncThunk(
	'authentication/signIn',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue, dispatch }
	) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				getAuth(),
				email,
				password
			)

			dispatch(connectToServer(userCredential.user.uid))

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
