import styles from './Cart.module.css';

import HeaderPage from "../../components/HeaderPage/HeaderPage.tsx";
import CartItem from "../../components/CartItem/CartItem.tsx";
import Product from "../Product/Product.tsx";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";
import axios from "axios";
import { PREFIX } from "../../helpers/api.ts";
import CheckoutTotal from "../../components/CheckoutTotal/CheckoutTotal.tsx";
import { Total } from "../../interfaces/product.interface.ts";
import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";


function Cart() {

	const [products, setProducts] = useState<Product[]>([])
	const items = useSelector((state: RootState) => state.cart.items)
	const navigate = useNavigate()
	const [total, setTotal] = useState<Total>({
		total: 0,
		delivery: 65,
		result: 0
	})

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${ PREFIX }/products/${ id }`, {});
		return data
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((item) => getItem(item.id)))
		setProducts(res)
	}

	useEffect(() => {
		loadAllItems()
	}, []);

	useEffect(() => {
		const total = items.reduce((acc, item) => {
			const product = products.find((product) => product.id === item.id)
			if (!product) return acc
			return acc + product.price * item.count
		}, 0)

		setTotal({
			total,
			delivery: 65,
			result: total + 65
		})

	}, [items, products]);

	const returnShop = () => {
		navigate('/')
	}

	return (
		<>
			<HeaderPage style={ { marginBottom: '20px' } } title='Корзина'/>
			<div className={ styles.cart_wrapper }>
				<div>
					{ items.length > 0 && items.map((item) => {
						const product = products.find((product) => product.id === item.id)
						if (!product) return
						return <CartItem count={ item.count } { ...product } key={ product.id }/>
					}) }

					{
						items.length === 0 && <div className={ styles.empty }>
							<div>Корзина пуста</div>
							<Button appearance='big' style={ { whiteSpace: 'nowrap' } } onClick={ returnShop }>Вернуться в магазин</Button>
						</div>
					}
				</div>
				{
					items.length > 0 && <CheckoutTotal total={ total }/>
				}

			</div>
		</>
	);
}

export default Cart;