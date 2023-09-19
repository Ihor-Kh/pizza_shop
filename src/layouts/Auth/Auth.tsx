import styles from './Auth.module.css';
import { Outlet } from "react-router-dom";

function Auth() {
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