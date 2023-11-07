import { Form } from '../../components/UI/Form/Form'
import { AlternativeChoice } from '../../components/UI/alternative-choice/AlternativeChoice.tsx'
import { CentredContainer } from '../../components/layout/CentredContainer/CentredContainer'
import { Loader } from '../../components/utils/Loader/Loader.tsx'
import { PATHS } from '../../paths.ts'
import { signIn } from '../../redux/slices/authentication-slice/additionalThunks/signIn.ts'
import { clearError } from '../../redux/slices/authentication-slice/authenticationSlice.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store'
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
				<AlternativeChoice
					contentText='Нет аккаунта?'
					linkText='Регистрация'
					redirectPath={PATHS.singUp}
					handleClick={() => dispatch(clearError())}
				/>
			</div>
		</CentredContainer>
	)
}