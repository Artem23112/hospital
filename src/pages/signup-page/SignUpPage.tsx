import { useState } from 'react'
import { AlternativeChoice } from '../../components/UI/alternative-choice/AlternativeChoice'
import { Form } from '../../components/UI/form/Form'
import { Input } from '../../components/UI/input/Input'
import { CentredContainer } from '../../components/layout/centred-container/CentredContainer'
import { Loader } from '../../components/utils/loader/Loader'
import { PATHS } from '../../paths'
import { signUp } from '../../redux/slices/authentication-slice/additionalThunks/signUp'
import { clearError } from '../../redux/slices/authentication-slice/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import s from './SignUpPage.module.scss'

export const SignUpPage = () => {
	const [name, setName] = useState<string>('')
	const dispatch = useAppDispatch()
	const { loading, error } = useAppSelector(state => {
		return {
			loading: state.authentication.loading,
			error: state.authentication.error,
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
					submitBtnContent={loading ? <Loader size={24} color='#fff' /> : 'Зарегистрироваться'}
					error={error && { type: error.type, message: error.message }}
				>
					<Input type='name' value={name} onChange={setName} placeholder='ФИО' required />
				</Form>
				<AlternativeChoice
					contentText='Уже есть аккаунт?'
					linkText='Войти'
					redirectPath={PATHS.login}
					handleClick={() => dispatch(clearError())}
				/>
			</div>
		</CentredContainer>
	)
}
