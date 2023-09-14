import { HTMLAttributes } from "react";

export interface FindInputProps extends HTMLAttributes<HTMLInputElement>{
	isValid?: boolean;
	appearance?: 'small' | 'big';
}