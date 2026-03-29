import {Box, Paper, Typography} from '@mui/material';
import type {WheelSegment} from '@/features/wheel/types/wheel.types.ts';
import {wheelPreviewStyles} from './WheelPreview.styles.ts';
import {getSlices} from "@/features/wheel/utils/getSlices.ts";
import {CX, CY, SIZE, WHEEL_RADIUS} from "@/features/wheel/constants/constants.ts";

interface WheelPreviewProps {
    segments: Omit<WheelSegment, 'id'>[];
    backgroundColor: string;
    borderColor: string;
}

export const WheelPreview = ({segments, backgroundColor, borderColor}: WheelPreviewProps) => {
    const totalWeight = segments.reduce((sum, s) => sum + (s.weight || 0), 0);
    const slices = getSlices(segments, totalWeight);
    const isValid = totalWeight === 100;

    return (
        <Paper sx={wheelPreviewStyles.container()}>
            <Typography variant="subtitle2" fontWeight={600} alignSelf="flex-start">
                Wheel Preview
            </Typography>

            <Typography variant="caption" sx={wheelPreviewStyles.weightIndicator(isValid)}>
                Weights: {totalWeight}/100 {isValid ? '✓' : '— must equal 100'}
            </Typography>

            <Box sx={{position: 'relative'}}>
                <Box sx={wheelPreviewStyles.pointer()}/>

                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                    {/* Background */}
                    <circle
                        cx={CX}
                        cy={CY}
                        r={WHEEL_RADIUS}
                        fill="none"
                        stroke={borderColor || '#00E676'}
                        strokeWidth={3}
                    />

                    {/* Slices */}
                    {slices.map((slice, i) => (
                        <g key={i}>
                            <path
                                d={slice.path}
                                fill={slice.color}
                                stroke={backgroundColor || '#1A1A2E'}
                                strokeWidth={1.5}
                            />
                            {slice.sliceAngle > 0.3 && (
                                <text
                                    x={slice.lx}
                                    y={slice.ly}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={10}
                                    fontWeight={600}
                                    fill="#fff"
                                    style={{pointerEvents: 'none', userSelect: 'none'}}
                                >
                                    {slice.label.length > 8 ? slice.label.slice(0, 8) + '…' : slice.label}
                                </text>
                            )}
                        </g>
                    ))}

                    {/* Center dot */}
                    <circle cx={CX} cy={CY} r={6} fill="rgba(255,255,255,0.15)"/>
                </svg>
            </Box>

            {/* Legend */}
            <Box sx={wheelPreviewStyles.legend()}>
                {segments.map((seg, i) => (
                    <Box key={i} sx={wheelPreviewStyles.legendItem()}>
                        <Box sx={wheelPreviewStyles.legendDot(seg.color)}/>
                        <Typography variant="caption" noWrap sx={{flex: 1}}>
                            {seg.label || `Segment ${i + 1}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {seg.weight}%
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};