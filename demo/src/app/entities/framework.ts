export interface Framework {
	id: number;
	name: string;
	rating: number;
	logoUrl: string;
}

export const createFramework = (overrides?: Partial<Framework>) => {
	return {
		id: 0,
		logoUrl: '',
		name: '',
		rating: 0,
		...overrides,
	};
};
