
export interface Product {
	id: number;
	name: string;
	price: number;
	ingredients: string[];
	image: string;
	rating: number;
}

export interface Total {
	total: number
	delivery: number
	result: number
}