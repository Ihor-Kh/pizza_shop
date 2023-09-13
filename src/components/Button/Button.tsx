import styles from './Button.module.css';
import { ButtonProps } from "./Button.props.ts";

function Button({ children, appearance = 'small', ...props}: ButtonProps) {
	return (
		<button { ...props } className={`${styles.button} ${styles[appearance]}`}>
			{ children }
		</button>
	);
}

export default Button;