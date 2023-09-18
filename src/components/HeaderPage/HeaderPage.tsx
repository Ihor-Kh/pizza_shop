import styles from './HeaderPage.module.css';
import { TitlePage } from "./HeaderPage.props.ts";

function HeaderPage({title, children, style}: TitlePage) {
	return (
		<div style={style} className={styles.header}>
			<h1 className={styles.title}>{ title }</h1>
			<div>
				{ children }
			</div>
		</div>
	);
}

export default HeaderPage;