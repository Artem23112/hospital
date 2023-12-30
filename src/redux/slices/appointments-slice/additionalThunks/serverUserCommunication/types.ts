import { Unique, unique } from '@/main-types'
import { generalAppointment } from '@/redux/slices/appointments-slice/types'
import { Dictionary, Intersect, Record, Static, String } from 'runtypes'

// user info types

export type UserInfoT = Static<typeof userInfo>
export type UniqueUserInfoT = Static<typeof uniqueUserInfo>

const userInfo = Record({
	name: String,
})
export const uniqueUserInfo = unique(userInfo)
export const usersInfoFromServer = Dictionary(userInfo, String)

// user appointments types

export type UserAppointmentT = Static<typeof userAppointment>
export type UniqueUserAppointmentT = Unique<UserAppointmentT>

const userAppointment = Intersect(generalAppointment, Record({ doctorId: String }))
export const userAppointmentsFromServer = Dictionary(userAppointment, String)
