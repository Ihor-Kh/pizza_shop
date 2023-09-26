import styles from './Product.module.css';

import { Await, useLoaderData, useParams } from "react-router-dom";
import { Product } from "../../interfaces/product.interface.ts";
import { Suspense } from "react";

function Product() {
	const { id } = useParams()
	const { data } = useLoaderData() as { data: Product }
	console.log(id)
	return (

		<Suspense fallback={ <>Loading...</> }>
			<Await resolve={ data }>
				{ ({ data }: { data: Product }) => (
					<div>
						<div className={ styles.img_item } style={ { backgroundImage: 'url("/img/bg_card.png")' } }/>
						<div>
							<div>
								<div>Цена</div>
								<div>{ data.price } ₴</div>
							</div>
							<div>
								<div>Рейтинг</div>
								<div className={ styles.rating }>
									{ data.rating }
									<img src="/img/star.svg" alt="Рейтинг"/>
								</div>
							</div>
							<div>
								<div>Состав</div>
								<ul>
								{
									data.ingredients.map((ingredient, index) => (
										<li key={ index }>{ ingredient }</li>
									))
								}
								</ul>
							</div>
						</div>
					</div>
				) }
			</Await>
		</Suspense>

	);
}

export default Product;