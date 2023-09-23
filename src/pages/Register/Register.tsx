import styles from './Register.module.css';
import React, { FormEvent } from "react";
import ItemForm from "../../components/ItemForm/ItemForm.tsx";
import Button from "../../components/Button/Button.tsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { PREFIX } from "../../helpers/api.ts";
import { LoginResponse } from "../../interfaces/auth.interface.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { usersActions } from "../../store/user.slice.ts";

type Register = {
	name: {
		value: string,
	},
	email: {
		value: string,
	},
	password: {
		value: string,
	}

}

function Register() {

	const [validateForm, setValidateForm] = React.useState<boolean>(true)
	const dispatch = useDispatch<AppDispatch>()

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & Register;

		const { name, email, password } = target;
		await sendRegister(name.value, email.value, password.value)
	}

	const sendRegister = async (name: string, email: string, password: string) => {
		// dispatch(login({ email, password }))
		if (name && email && password) {
			console.log('send')
			const { data } = await axios.post<LoginResponse>(`${ PREFIX }/auth/register`, { name, email, password })
			console.log(data)
			dispatch(usersActions.setToken(data.access_token))
		} else {
			setValidateForm(false)
		}
	}


	return (
		<div className={ styles.login }>
			<h1 className='title'>Регистрация</h1>
			<form onSubmit={ submit }>
				{ !validateForm && <div className={ styles.error }>Форма заполнена не верно!</div> }

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
				<ItemForm
					id='name'
					name='name'
					label="Ваше имя"
					placeholder="Имя"
				/>

				<div className={ styles.form_control }>
					<Button
						style={ { width: '80%', maxWidth: '250px', marginBottom: '20px' } }
						appearance='big'
					>
						Зарегистрироваться
					</Button>

					<div>Есть акканут?</div>
					<Link
						to='/auth/login'
						className={ styles.register }
					>
						Войти
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;