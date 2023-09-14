import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import Menu from "./pages/Menu/Menu.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Error from "./pages/Error/Error.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./layouts/Account/Account.tsx";
import Product from "./pages/Product/Product.tsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Account/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/product/:id',
				element: <Product/>
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
