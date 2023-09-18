import styles from './Card.module.css';
import { CardProps } from "./Card.props.ts";
import { Link } from "react-router-dom";

function card({ card }: CardProps) {
	return (
		<Link to={ `/product/${card.id}` }>
			<div className={ styles.wrapper }>
				{/*{ card.image }*/}
				{/*<div className={ styles.inform } style={{ backgroundImage: `url(${card.image})`}}>*/}
					<div className={ styles.inform } style={ { backgroundImage: 'url("/img/bg_card.png")' } }>
					<div className={ styles.head }>
						<div className={ styles.price }>
							{ card.price } <span className={ styles.price_currency }>₴</span>
						</div>
						<div className={ styles.cart }>
							<img src="/img/cart_primary.svg" alt="Добавить"/>
						</div>
					</div>

					<div className={ styles.rating }>
						{ card.rating }
						<img src="/img/star.svg" alt="Рейтинг"/>
					</div>
				</div>
				<div className={ styles.footer }>
					<div className={ styles.name }>
						{ card.name }
					</div>
					<div className={ styles.description }>
						{ card.ingredients.join(', ') }
					</div>
				</div>
			</div>
		</Link>
	);
}

export default card;