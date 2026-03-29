import type {WheelSegment} from "@/features/wheel/types/wheel.types.ts";
import {CX, CY, WHEEL_RADIUS} from "@/features/wheel/constants/constants.ts";

export const getSlices = (segments: Omit<WheelSegment, 'id'>[], totalWeight: number) => {
    if (!segments.length || totalWeight === 0) return [];

    let currentAngle = -Math.PI / 2;

    return segments.map((seg) => {
        const sliceAngle = (seg.weight / totalWeight) * 2 * Math.PI;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        currentAngle = endAngle;

        const x1 = CX + WHEEL_RADIUS * Math.cos(startAngle);
        const y1 = CY + WHEEL_RADIUS * Math.sin(startAngle);
        const x2 = CX + WHEEL_RADIUS * Math.cos(endAngle);
        const y2 = CY + WHEEL_RADIUS * Math.sin(endAngle);
        const largeArc = sliceAngle > Math.PI ? 1 : 0;

        const path = `M ${CX} ${CY} L ${x1} ${y1} A ${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = WHEEL_RADIUS * 0.65;
        const lx = CX + labelRadius * Math.cos(labelAngle);
        const ly = CY + labelRadius * Math.sin(labelAngle);

        return {
            path,
            color: seg.color || '#ccc',
            label: seg.label,
            lx,
            ly,
            sliceAngle,
        };
    });
};