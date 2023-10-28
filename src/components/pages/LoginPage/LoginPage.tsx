import { Link } from 'react-router-dom'
import { signIn } from '../../../redux/slices/authentication-slice/additionalThunks/signIn.ts'
import { clearError } from '../../../redux/slices/authentication-slice/authenticationSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts'
import { Form } from '../../UI/Form/Form'
import { CentredContainer } from '../../layout/CentredContainer/CentredContainer'
import { Loader } from '../../utils/Loader/Loader.tsx'
import s from './LoginPage.module.scss'

export const LoginPage = () => {
	const dispatch = useAppDispatch()
	const { loading, error } = useAppSelector(({ authentication }) => ({
		loading: authentication.loading,
		error: authentication.error
	}))

	function trySingIn(email: string, password: string) {
		dispatch(signIn({ email, password }))
	}

	return (
		<CentredContainer>
			<div className={s['login-wrapper']}>
				<h3 className={s['title']}>Вход в аккаунт</h3>
				<Form
					submitBtnContent={
						loading ? <Loader size={24} color='#fff' /> : 'Войти'
					}
					submitHandler={trySingIn}
					error={error}
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
