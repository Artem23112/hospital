import { Dictionary, Intersect, Record, Static, String } from 'runtypes'
import { Unique } from '../../../../../main-types'
import { generalAppointment } from '../../types'

// user info types

export type UserInfoT = Static<typeof userInfo>
export type UniqueUserInfoT = Unique<UserInfoT>

const userInfo = Record({
	name: String
})
export const usersInfoFromServer = Dictionary(userInfo, String)

// user appointments types

export type UserAppointmentT = Static<typeof userAppointment>
export type UniqueUserAppointmentT = Unique<UserAppointmentT>

const userAppointment = Intersect(generalAppointment, Record({ doctorId: String }))
export const userAppointmentsFromServer = Dictionary(userAppointment, String)
