export interface DataItem {
	id: string;
	title: string;
	date: string;
	tags: string[];
	children?: DataItem[]
}

export type DataList = Array<{
	id: string
	title: string
	children: DataItem[]
}>
