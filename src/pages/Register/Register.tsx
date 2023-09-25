import styles from './Register.module.css';
import React, { FormEvent } from "react";
import ItemForm from "../../components/ItemForm/ItemForm.tsx";
import Button from "../../components/Button/Button.tsx";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { register, usersActions } from "../../store/user.slice.ts";

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
	const { errorMessageRegister } = useSelector((s: RootState) => s.user)

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & Register;

		const { name, email, password } = target;
		await sendRegister(name.value, email.value, password.value)
	}

	const sendRegister = async (name: string, email: string, password: string) => {
		// dispatch(login({ email, password }))
		dispatch(usersActions.clearErrorMessage())
		if (name && email && password) {
			console.log('send')
			dispatch(register({ name, email, password }))
			// dispatch(usersActions.clearErrorMessage())
			// dispatch(usersActions.setToken(data.access_token))
		} else {
			setValidateForm(false)
		}
	}


	return (
		<div className={ styles.login }>
			<h1 className='title'>Регистрация</h1>
			<form onSubmit={ submit }>
				{ !validateForm && <div className={ styles.error }>Форма заполнена не верно!</div> }
				{ errorMessageRegister && <div className={ styles.error }>{ errorMessageRegister }</div> }

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