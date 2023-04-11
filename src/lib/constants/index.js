export const LINES = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[3, 5, 7],
	[1, 5, 9]
];
export const ICON_PLAYERS = [
	{ a: 'x', b: 'o' },
	{ a: 'A', b: 'B' },
	{ a: '⭐', b: '❤️' }
];
export const COLOR_PLAYERS = [
	{ label: 'b/g', a: '#77a4ff', b: '#68ca86', a_co: '#375ba2', b_co: '#0f6529' },
	{ label: 'r/b', a: '#ffa1c0', b: '#77a4ff', a_co: '#b02754', b_co: '#375ba2' },
	{ label: 'g/r', a: '#68ca86', b: '#ffa1c0', a_co: '#0f6529', b_co: '#b02754' }
];
export const MAPPED_PAD = [7, 8, 9, 4, 5, 6, 1, 2, 3];

export const DIRECTIONS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

export const DIRECTION_POSIBILITIES = {
	7: ['ArrowRight', 'ArrowDown'],
	8: ['ArrowRight', 'ArrowLeft', 'ArrowDown'],
	9: ['ArrowLeft', 'ArrowDown'],
	4: ['ArrowRight', 'ArrowDown', 'ArrowUp'],
	5: ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'],
	6: ['ArrowLeft', 'ArrowDown', 'ArrowUp'],
	1: ['ArrowRight', 'ArrowUp'],
	2: ['ArrowRight', 'ArrowLeft', 'ArrowUp'],
	3: ['ArrowLeft', 'ArrowUp']
};
