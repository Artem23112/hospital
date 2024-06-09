import { AlternativeChoice } from '@/components/UI/alternative-choice/AlternativeChoice'
import { Form } from '@/components/UI/form/Form'
import { CentredContainer } from '@/components/layout/centred-container/CentredContainer'
import { Loader } from '@/components/utils/components/Loader/Loader'
import { PATHS } from '@/paths'
import { signIn } from '@/redux/slices/authentication-slice/additionalThunks/signIn'
import {
	clearError,
	selectorError,
	selectorLoading,
} from '@/redux/slices/authentication-slice/authenticationSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import s from './LoginPage.module.scss'

export const LoginPage = () => {
	const dispatch = useAppDispatch()
	const loading = useAppSelector(selectorLoading)
	const error = useAppSelector(selectorError)

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
