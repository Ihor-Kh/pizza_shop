import styles from './Menu.module.css';

import HeaderPage from "../../components/HeaderPage/HeaderPage.tsx";
import FindInput from "../../components/FindInput/FindInput.tsx";
import Card from "../../components/Card/Card.tsx";
import { Product } from "../../interfaces/product.interface.ts";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Menu() {

	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()

	const getMenu = async () => {
		try {
			setIsLoading(true)
			await new Promise((resolve) => setTimeout(resolve, 1000))

			const { data } = await axios.get<Product[]>('https://purpleschool.ru/pizza-api-demo/products');
			setProducts(data)
			setIsLoading(false)
		} catch (e) {
			console.error(e)
			if ( e instanceof AxiosError) {
				setError(e.message)
			}
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getMenu()
	}, [])

	return (
		<>
			<HeaderPage title='Меню' style={ { marginBottom: '50px' } }>
				<FindInput placeholder='Введите блюдо или состав'/>
			</HeaderPage>
			<div className={ styles.menu }>
				{ error && 'Ошибка загрузки меню'}
				{ isLoading && 'Загрузка меню ...'}
				{ !isLoading && products.map((product) => (
					<Card card={ product } key={ product.id }/>
				)) }


			</div>
		</>
	);
}

export default Menu;