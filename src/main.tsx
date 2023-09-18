import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// import Menu from "./pages/Menu/Menu.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Error from "./pages/Error/Error.tsx";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import Account from "./layouts/Account/Account.tsx";
import Product from "./pages/Product/Product.tsx";
import axios from "axios";

const Menu = React.lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
	{
		path: '/',
		element: <Account/>,
		children: [
			{
				path: '/',
				element:<Suspense fallback={<>Loading...</>}><Menu/></Suspense>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <Error/>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`https://purpleschool.ru/pizza-api-demo/products/${ params.id }`)
									.then( data  => resolve(data))
									.catch( error => reject(error))
							}, 1000 )
						})
						// data: axios.get(`https://purpleschool.ru/pizza-api-demo/products/${ params.id }`).then( data  => data)
					})
				}
			}
		]
	},
	{
		path: '*',
		element: <Error/>
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
			{/*<App/>*/}
		<RouterProvider router={ router }/>
	</React.StrictMode>,
)
