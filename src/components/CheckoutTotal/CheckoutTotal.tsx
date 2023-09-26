import styles from './CheckoutTotal.module.css';
import Button from "../Button/Button.tsx";
import { Total } from "../../interfaces/product.interface.ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store.ts";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice.ts";



function CheckoutTotal({total}: { total: Total}) {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const sendOrder = () => {
		console.log('send order')
		dispatch(cartActions.clearCart())
		navigate('/order')
	}

	return (
		<div>
			<div>
				<div className={ styles.row }>
					<div>Итог</div>
					<div>{ total.total } ₴</div>
				</div>
				<div className={ styles.row }>
					<div>Доставка</div>
					<div>{ total.delivery } ₴</div>
				</div>
				<div className={ styles.row }>
					<div>Итог</div>
					<div>{ total.result } ₴</div>
				</div>
			</div>
			<div className={styles.order}>
				<Button onClick={sendOrder} appearance='big'>Оформить</Button>
			</div>
		</div>
	);
}

export default CheckoutTotal;