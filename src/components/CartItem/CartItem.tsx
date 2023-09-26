import styles from './CartItem.module.css';
import { CartItemProps } from "./CartItem.props.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.ts";
import { cartActions } from "../../store/cart.slice.ts";

function CartItem({ id, name, price, count }: CartItemProps) {

	const dispatch = useDispatch<AppDispatch>()

	const deleteItem = () => {
		dispatch(cartActions.deleteItem(id))
	}
	const plusItem = () => {
		dispatch(cartActions.addItem(id))
	}
	const minusItem = () => {
		dispatch(cartActions.removeItem(id))
	}

	return (
		<div className={ styles.item }>
			<div className={ styles.inform }>
				<div className={ styles.img_item } style={ { backgroundImage: 'url("/img/bg_card.png")' } }/>
				<div className={ styles.inform_description }>
					<div className={ styles.name }>{ name ?? 'Без названия' }</div>
					<div className={ styles.price }>{ price } ₴</div>
				</div>
			</div>
			<div className={ styles.control }>
				<div className={ styles.control_counter }>
					<div onClick={ minusItem } className={ `${ styles.control_minus } ${ styles.control_btn }` }>
						<span className={ styles.line }></span>
					</div>
					<div className={ `${ styles.count_item }` }>{ count }</div>
					<div onClick={ plusItem } className={ `${ styles.control_plus } ${ styles.control_btn }` }>
						<span className={ `${ styles.line } ${ styles.line_plus }` }></span>
						<span className={ `${ styles.line } ${ styles.line_plus }` } style={ { rotate: '90deg' } }></span>
					</div>
				</div>
				<div className={ styles.delete } onClick={ deleteItem }>
					<img src="/img/cross.svg" alt="Удалить"/>
				</div>
			</div>
		</div>
	);
}

export default CartItem;