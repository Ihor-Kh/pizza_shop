// import styles from './Menu.module.css';

import HeaderPage from "../../components/HeaderPage/HeaderPage.tsx";
import FindInput from "../../components/FindInput/FindInput.tsx";
import Card from "../../components/Card/Card.tsx";

function Menu() {

	const card = {
		id: 1,
		price: 100,
		rating: 4,
		name: 'Борщ',
		description: 'Суп с капустой и свеклой',
		image: 'https://eda.ru/img/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/120213144558/p_O.jpg'
	}

	return (
		<>
			<HeaderPage title='Меню'>
				<FindInput placeholder='Введите блюдо или состав' />
			</HeaderPage>
			<div>
				<Card card={ card }/>
			</div>
		</>
	);
}

export default Menu;