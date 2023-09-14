// import styles from './Menu.module.css';

import HeaderPage from "../../components/HeaderPage/HeaderPage.tsx";
import FindInput from "../../components/FindInput/FindInput.tsx";

function Menu() {
	return (
		<>
			<HeaderPage title='Меню'>
				<FindInput placeholder='Введите блюдо или состав' />
			</HeaderPage>
			
		</>
	);
}

export default Menu;