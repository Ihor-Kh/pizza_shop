import styles from './HeaderPage.module.css';
import { TitlePage } from "./HeaderPage.props.ts";

function HeaderPage({title, children}: TitlePage) {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>{ title }</h1>
			<div>
				{ children }
			</div>
		</div>
	);
}

export default HeaderPage;