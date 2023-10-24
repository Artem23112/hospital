import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../../../redux/slices/authentication-slice/additionalThunks/signUp'
import { clearError } from '../../../redux/slices/authentication-slice/authenticationSlice'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import AuthForm from '../../UI/AuthForm/AuthForm'
import CentredContainer from '../../layout/CentredContainer/CentredContainer'
import Loader from '../../utils/Loader/Loader'
import s from './SignUpPage.module.scss'

const SignUpPage = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [name, setname] = useState<string>('')
	const [emptyFields, setEmptyFields] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { loading, error } = useAppSelector<SelectedT>(state => {
		return {
			loading: state.authentication.loading,
			error: state.authentication.error
		}
	})

	function trySingUp() {
		if (!email || !password || !name) {
			setEmptyFields(true)
			return
		}

		setEmptyFields(false)
		dispatch(signUp({ email, password, name }))
	}

	return (
		<CentredContainer>
			<div className={s['signup-wrapper']}>
				<h3 className={s['title']}>Регистрация</h3>
				<p className={s['err-message']}>
					{emptyFields && 'Заполните все поля'}
				</p>
				<AuthForm
					email={email}
					pw={password}
					setEmail={setEmail}
					setPw={setPassword}
					submitHandler={trySingUp}
					submitBtnContent={
						loading ? <Loader size={24} color='#fff' /> : 'Зарегистрироваться'
					}
					error={error && { type: error.type, message: error.message }}
				>
					<input
						className={s['input']}
						type='name'
						value={name}
						onChange={e => setname(e.target.value)}
						placeholder='ФИО'
					/>
				</AuthForm>
				<p className={s['link-wrapper']}>
					Уже есть аккаунт?{' '}
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

type SelectedT = {
	loading: boolean
	error: IAuthInitialState['error']
}

export default SignUpPage
