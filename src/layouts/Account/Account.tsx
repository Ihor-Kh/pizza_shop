import styles from './Account.module.css';

import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";

function Account() {
	// const location = useLocation();

	const navigation = [
		{
			title: 'Меню',
			icon: 'menu',
			link: '/'
		},
		{
			title: 'Корзина',
			icon: 'cart',
			link: '/cart',
			items: 0
		}
	]

	return (
		<div className={styles.layout_account}>
			<div className={styles.left_navigation}>
				<div>
					<img className={styles.user_avatar} src="/img/user_logo.png" alt="Иконка аккаунта"/>
					<div className={styles.user_inform}>
						<div className={styles.user_name}>IhorKh</div>
						<div className={styles.user_email}>ihorkh@gmail.com</div>
					</div>
					<nav>
						<ul className={styles.menu}>
							{
								navigation.map((item) => (
									<li className={`${styles.link} `} key={item.link}>
										<img src={ `/img/${ item.icon }.svg` } alt={ item.icon }/>
										<NavLink className={({ isActive }) => isActive ? styles.active : ''} to={ item.link }>{ item.title }</NavLink>
									</li>
								))
							}
						</ul>
					</nav>
				</div>
				<div>
					<Button style={{paddingLeft: '14px'}}>
						<img style={{ marginRight: '10px' }} src="/img/out.svg" alt="Выход"/>
						Выйти
					</Button>
				</div>
			</div>
			<div className={styles.main_container}>
				<Outlet/>
			</div>
		</div>
	);
}

export default Account;