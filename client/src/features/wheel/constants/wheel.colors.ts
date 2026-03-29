export const SEGMENT_COLORS = [
    '#E57373',
    '#81C784',
    '#64B5F6',
    '#FFD54F',
    '#BA68C8',
    '#4DB6AC',
    '#FF8A65',
    '#90A4AE',
    '#F06292',
    '#A5D6A7',
    '#7986CB',
    '#26C6DA',
];

export const getSegmentColor = (index: number) =>
    SEGMENT_COLORS[index % SEGMENT_COLORS.length];