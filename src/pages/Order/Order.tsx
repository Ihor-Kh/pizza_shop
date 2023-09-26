import styles from './Order.module.css';

import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

function Order() {
	const navigate = useNavigate()

	const returnShop = () => {
		navigate('/')
	}

	return (
		<div className={styles.wrapper}>
			<img src="/img/order_pizza.png" alt="Пицца"/>
			<div className={styles.success}>Ваш заказ успешно <br/> оформлен!</div>
			<Button onClick={returnShop} style={{whiteSpace: 'nowrap'}} appearance='big'>Сделать новый</Button>
		</div>
	);
}

export default Order;