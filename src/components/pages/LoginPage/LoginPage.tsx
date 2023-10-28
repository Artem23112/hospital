import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signIn } from '../../../redux/slices/authentication-slice/additionalThunks/signIn.ts'
import { clearError } from '../../../redux/slices/authentication-slice/authenticationSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts'
import AuthForm from '../../UI/AuthForm/AuthForm.tsx'
import CentredContainer from '../../layout/CentredContainer/CentredContainer'
import Loader from '../../utils/Loader/Loader.tsx'
import s from './LoginPage.module.scss'

const LoginPage = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [emptyFields, setEmptyFields] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { loading, error } = useAppSelector(state => {
		return {
			loading: state.authentication.loading,
			error: state.authentication.error
		}
	})

	function trySingIn() {
		if (!email || !password) {
			setEmptyFields(true)
			return
		}

		setEmptyFields(false)
		dispatch(signIn({ email, password }))
	}

	return (
		<CentredContainer>
			<div className={s['login-wrapper']}>
				<h3 className={s['title']}>Вход в аккаунт</h3>
				<p className={s['err-message']}>
					{emptyFields && 'Заполните все поля'}
				</p>

				<AuthForm
					email={email}
					pw={password}
					setEmail={setEmail}
					setPw={setPassword}
					submitBtnContent={
						loading ? <Loader size={24} color='#fff' /> : 'Войти'
					}
					submitHandler={trySingIn}
					error={error && { type: error.type, message: error.message }}
				/>
				<p className={s['link-wrapper']}>
					Нет аккаунта?{' '}
					<Link
						to='/signup'
						onClick={() => {
							dispatch(clearError())
						}}
					>
						Регистрация
					</Link>
				</p>
			</div>
		</CentredContainer>
	)
}

export default LoginPage
