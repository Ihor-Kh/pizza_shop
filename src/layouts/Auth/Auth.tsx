import styles from './Auth.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

function Auth() {
	const navigate = useNavigate()
	const { token} = useSelector((s: RootState) => s.user)

	useEffect(() => {
		if (token) navigate('/')
	}, [token])

	return (
		<div className={styles.layout_auth + ' container'}>
			<div className={styles.left_logo}>
				<img src="/img/logo.svg" alt="Логотип сервиса"/>
			</div>
			<div className={styles.right_form}>
				<Outlet/>
			</div>
		</div>
	);
}

export default Auth;