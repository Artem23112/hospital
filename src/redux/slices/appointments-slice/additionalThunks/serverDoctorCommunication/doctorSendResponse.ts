import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, push, ref, set } from 'firebase/database'
import { StatusAppointmentT } from '../../types'

export const doctorSendResponse = createAsyncThunk(
	'appointments/adminSendResponse',
	async ({
		status,
		uid,
		date
	}: {
		status: StatusAppointmentT
		uid: string
		date: string
	}) => {
		const path = ref(getDatabase(), `users/${uid}/responses`)
		const uniqueIDPath = push(path)

		const responseData = {
			status,
			date
		}

		set(uniqueIDPath, responseData)
	}
)
