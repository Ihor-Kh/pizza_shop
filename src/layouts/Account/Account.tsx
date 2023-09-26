import styles from './Account.module.css';

import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { getProfile, usersActions } from "../../store/user.slice.ts";
import { useEffect } from "react";


function Account() {
	// const location = useLocation();



	const dispatch = useDispatch<AppDispatch>()
	const { items } = useSelector((s: RootState) => s.cart)

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

	const profile = useSelector((s: RootState) => s.user.profile)


	const logout = () => {
		dispatch(usersActions.logout())
	}

	useEffect(() => {
		dispatch(getProfile())
	}, [])

	return (
		<div className={styles.layout_account + ' container'}>
			<div className={styles.left_navigation}>
				<div>
					<img className={styles.user_avatar} src="/img/user_logo.png" alt="Иконка аккаунта"/>
					<div className={styles.user_inform}>
						<div className={styles.user_name}>{ profile?.name ?? ''}</div>
						<div className={styles.user_email}>{ profile?.email ?? ''}</div>
					</div>
					<nav>
						<ul className={styles.menu}>
							{
								navigation.map((item) => (
									<li className={`${styles.link} `} key={item.link}>
										<img src={ `/img/${ item.icon }.svg` } alt={ item.icon }/>
										<NavLink className={({ isActive }) => isActive ? styles.active : ''} to={ item.link }>{ item.title }</NavLink>
										{ item.title === 'Корзина'
											&& items.reduce((sum, item) => sum + item.count, 0) > 0
											&& <span className={styles.count}>{
												items.reduce((sum, item) => sum + item.count, 0)
											}</span>
										}
									</li>
								))
							}
						</ul>
					</nav>
				</div>
				<div>
					<Button style={{paddingLeft: '14px'}} onClick={logout}>
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