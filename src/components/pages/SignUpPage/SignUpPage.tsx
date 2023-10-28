import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../../../redux/slices/authentication-slice/additionalThunks/signUp'
import { clearError } from '../../../redux/slices/authentication-slice/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { Form } from '../../UI/Form/Form'
import { Input } from '../../UI/Input/Input'
import { CentredContainer } from '../../layout/CentredContainer/CentredContainer'
import { Loader } from '../../utils/Loader/Loader'
import s from './SignUpPage.module.scss'

export const SignUpPage = () => {
	const [name, setName] = useState<string>('')
	const dispatch = useAppDispatch()
	const { loading, error } = useAppSelector(state => {
		return {
			loading: state.authentication.loading,
			error: state.authentication.error
		}
	})

	function trySingUp(email: string, password: string) {
		dispatch(signUp({ email, password, name }))
	}

	return (
		<CentredContainer>
			<div className={s['signup-wrapper']}>
				<h3 className={s['title']}>Регистрация</h3>
				<Form
					submitHandler={trySingUp}
					submitBtnContent={
						loading ? <Loader size={24} color='#fff' /> : 'Зарегистрироваться'
					}
					error={error && { type: error.type, message: error.message }}
				>
					<Input
						type='name'
						value={name}
						onChange={setName}
						placeholder='ФИО'
						required
					/>
				</Form>
				<p className={s['link-wrapper']}>
					Уже есть аккаунт
					<Link
						to='/login'
						onClick={() => {
							dispatch(clearError())
						}}
					>
						Войти
					</Link>
				</p>
			</div>
		</CentredContainer>
	)
}
