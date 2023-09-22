import styles from './Login.module.css';
import Button from "../../components/Button/Button.tsx";
import ItemForm from "../../components/ItemForm/ItemForm.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
// import axios, { AxiosError } from "axios";
// import { PREFIX } from "../../helpers/api.ts";
// import { LoginResponse } from "../../interfaces/auth.interface.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { login, usersActions } from "../../store/user.slice.ts";

type Login = {
	email: {
		value: string,
	},
	password: {
		value: string,
	}
}

function Login() {

	// const [error, setError] = useState<string | undefined>()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const { token, errorMessage} = useSelector((s: RootState) => s.user)


	useEffect(() => {
		if (token) navigate('/')
	}, [token])

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & Login;
		dispatch(usersActions.clearErrorMessage())
		const { email, password } = target;
		await sendLogin(email.value, password.value)
	}

	const sendLogin = async (email: string, password: string) => {
		// console.log(email, ' ===== ', password);
		// try {

			dispatch(login({ email, password }))

			// console.log(data);
			// setError(undefined)

			// dispatch(usersActions.setToken(data.access_token))
			// navigate('/')
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		console.error(e)
		// 		setError(e.response?.data.message)
		// 	}
		// }
	}

	return (
		<div className={ styles.login }>
			<h1 className='title'>Вход</h1>
			<form onSubmit={ submit }>
				{ errorMessage && <div className={ styles.error }>{ errorMessage }</div> }
				<ItemForm
					label="Ваш email"
					id='email'
					name='email'
					placeholder="Email"
				/>
				<ItemForm
					type="password"
					id='password'
					name='password'
					label="Ваш пароль"
					placeholder="Пароль"
				/>

				<div className={ styles.form_control }>
					<Button
						style={ { width: '80%', maxWidth: '250px', marginBottom: '20px' } }
						appearance='big'
					>
						Вход
					</Button>

					<div>Нет акканута?</div>
					<Link
						to='/auth/register'
						className={ styles.register }
					>
						Зарегистрироваться
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;
