import styles from './ItemForm.module.css';

import Input from "../Input/Input.tsx";
import { ItemFormProps } from "./ItemForm.props.ts";

function ItemForm({label, id, ...props}: ItemFormProps) {
	return (
		<div>
			<label htmlFor={id} className={styles.item_label}>{label}</label>
			<Input style={{marginTop: '7px'}} id={id} {...props}/>
		</div>
	);
}

export default ItemForm;