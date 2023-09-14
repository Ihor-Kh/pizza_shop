import styles from './FindInput.module.css';

import { ForwardedRef, forwardRef } from "react";
import { FindInputProps } from "./FindInput.ts";

const FindInput = forwardRef(function Input({ className, isValid = true, ...props }: FindInputProps, ref: ForwardedRef<HTMLInputElement>) {
	return (
		<div className={ styles.wrapper_input }>
			<img className={styles.search_icon} src="/img/find.svg" alt="Поиск"/>
			<input
				{ ...props }
				ref={ ref }
				className={ `${ styles.input } ${ className }` }
			/>
		</div>

	);
})

export default FindInput;