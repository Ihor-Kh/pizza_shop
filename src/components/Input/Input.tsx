import styles from './Input.module.css';

import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props.ts";

const Input = forwardRef(function Input({ className, isValid = true, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>) {
	return (
		<input
			{ ...props }
			ref={ ref }
			className={`${styles.input} ${isValid ? styles.valid : styles.invalid} ${className}`}
		/>
	);
})

export default Input;