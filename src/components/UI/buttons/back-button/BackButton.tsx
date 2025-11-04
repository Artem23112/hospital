import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export const BackButton = ({ className = '' }: { className?: string }) => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1) // Перенаправляем пользователя на один шаг назад
	}

	const buttonStyle = {
		display: 'flex',
		alignItems: 'center',
		juctifyContent: 'center',
		padding: '8px 20px 10px',
		backgroundColor: 'white',
		color: '#006ed0',
		fontSize: '30px',
		lineHeight: '30px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontWeight: 'bold',
		boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1)',
		transition: 'background-color 0.3s ease',
	}

	const handleClick = () => {
		goBack()
	}

	return (
		<button
			className={clsx(className)}
			style={buttonStyle}
			onClick={handleClick}
		>
			&larr;
		</button>
	)
}
