import { useEffect } from 'react'
import { connectToServer } from '../../../redux/slices/authentication-slice/additionalThunks/connectToServer'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store'
import DoctorProfile from '../../layout/DoctorProfile/DoctorProfile'
import UserProfile from '../../layout/UserProfile/UserProfile'

const HomePage = () => {
	const dispatch = useAppDispatch()
	const { rights, id } = useAppSelector<SelectedT>((state: RootState) => {
		return {
			rights: state.authentication.rights,
			id: state.authentication.id
		}
	})

	useEffect(() => {
		if (rights) return
		if (!id) return

		dispatch(connectToServer(id))
	}, [rights, id])

	return (
		<div>
			{rights === 'user' && <UserProfile />}
			{rights === 'admin' && <DoctorProfile />}
		</div>
	)
}

type SelectedT = {
	id: IAuthInitialState['id']
	rights: IAuthInitialState['rights']
}

export default HomePage
