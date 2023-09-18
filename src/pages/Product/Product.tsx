// import styles from './Product.module.css';

import { Await, useLoaderData, useParams } from "react-router-dom";
import { Product } from "../../interfaces/product.interface.ts";
import { Suspense } from "react";

function Product() {
	const { id } = useParams()
	const data = useLoaderData() as { data: Product }
	// console.log(data)
	return (
		<>
			<div>
				id: { id }
				<br/>
				<br/>
				{/*{ data.name }*/ }


			</div>
			<Suspense fallback={ <>Loading...</> }>
				<Await resolve={ data.data }>
					{ ({ data }: { data: Product }) => (
						<>Product - { data.name }</>
					) }
				</Await>
			</Suspense>
		</>
	);
}

export default Product;