import Button from "./components/Button/Button.tsx";
import { useState } from "react";
import Input from "./components/Input/Input.tsx";

function App() {

	const [counter, setCounter] = useState<number>(0)
	const clickButton = () => {
		setCounter((state) => state + 1)
	}
	return (
		<>
			<div>Счетчик: { counter }</div>
			<Button onClick={ clickButton }>Кнопка</Button>
			<Button appearance='big' onClick={ clickButton }>Кнопка</Button>
			<Input placeholder='test' />
			<nav>
				<ul>
					<li><a href="/">Меню</a></li>
					<li><a href="/cart">Корзина</a></li>
				</ul>
			</nav>

		</>
	)
}

export default App
