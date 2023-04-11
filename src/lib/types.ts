export interface ColorSet {
	label: string;
	a: string;
	b: string;
	a_co: string;
	b_co: string;
}

export type indexString<T> = { [index: string]: T };

export interface IconSet extends indexString<string> {
	// [index: string]: string;
	a: string;
	b: string;
}

export interface Config {
	colors: ColorSet;
	icons: IconSet;
}

export interface DataItem {
	pos: number;
	active: boolean;
	player: string | undefined;
	value: any;
}
export type Data = DataItem[];

export interface Score extends indexString<string[]> {
	a: string[];
	b: string[];
}
