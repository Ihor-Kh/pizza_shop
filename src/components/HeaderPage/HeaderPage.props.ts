import { CSSProperties, ReactNode } from "react";

export interface TitlePage {
	title: string;
	children?: ReactNode;
	style?: CSSProperties
}