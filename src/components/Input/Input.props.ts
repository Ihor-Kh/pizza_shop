import { HTMLAttributes } from "react";

export interface InputProps extends HTMLAttributes<HTMLInputElement>{
	isValid?: boolean;
	appearance?: 'small' | 'big';
}