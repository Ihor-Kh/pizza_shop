import styles from './Menu.module.css';

import HeaderPage from "../../components/HeaderPage/HeaderPage.tsx";
import FindInput from "../../components/FindInput/FindInput.tsx";
import Card from "../../components/Card/Card.tsx";
import { Product } from "../../interfaces/product.interface.ts";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Menu() {

	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()

	const [search, setSearch] = useState<string>('')
	// const [searchProducts, setSearchProducts] = useState<Product[]>([])

	useEffect(() => {
		getMenu(search)
	}, [search])

	const getMenu = async (name?: string ) => {
		try {
			setIsLoading(true)
			// await new Promise((resolve) => setTimeout(resolve, 1000))

			const { data } = await axios.get<Product[]>('https://purpleschool.ru/pizza-api-demo/products', {
				params: {
					name
				}
			});
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

	const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	// useEffect(() => {
	// 	if (search.trim()) {
	// 		setSearchProducts(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())))
	// 	} else {
	// 		setSearchProducts(products)
	// 	}
	// }, [search, products]);



	return (
		<>
			<HeaderPage title='Меню' style={ { marginBottom: '50px' } }>
				<FindInput onInput={changeSearch} placeholder='Введите блюдо или состав'/>
			</HeaderPage>
			<div className={ styles.menu }>
				{ error && 'Ошибка загрузки меню'}
				{ isLoading && 'Загрузка меню ...'}
				{ !isLoading && products.length > 0 && products.map((product) => (
					<Card card={ product } key={ product.id }/>
				)) }
				{ !isLoading && products.length === 0 && 'Ничего не найдено :(' }
			</div>
		</>
	);
}

export default Menu;