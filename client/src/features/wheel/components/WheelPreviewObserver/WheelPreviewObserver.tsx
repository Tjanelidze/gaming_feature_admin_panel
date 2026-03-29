import {useEffect, useRef, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

import type {WheelReqBody} from '@/features/wheel/validators/wheel.validator.ts';
import {WheelPreview} from "@/features/wheel/components/WheelForm/components/WheelPreview/WheelPreview.tsx";
import type {WheelSegment} from "@/features/wheel/types/wheel.types.ts";

interface WheelPreviewObserverProps {
    initialSegments?: Omit<WheelSegment, 'id'>[];
    initialBg?: string;
    initialBorderColor?: string;
}

export const WheelPreviewObserver = ({
                                         initialSegments = [],
                                         initialBg = '#1A1A2E',
                                         initialBorderColor = '#00E676',
                                     }: WheelPreviewObserverProps) => {
    const {control} = useFormContext<WheelReqBody>();

    const watchedSegments = useWatch({control, name: 'segments'});
    const watchedBg = useWatch({control, name: 'backgroundColor'});
    const watchedBorderColor = useWatch({control, name: 'borderColor'});

    const [previewSegments, setPreviewSegments] = useState(initialSegments);
    const [previewBg, setPreviewBg] = useState(initialBg);
    const [previewBorderColor, setPreviewBorderColor] = useState(initialBorderColor);

    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const prevRef = useRef({segments: '', bg: '', borderColor: ''});

    useEffect(() => {
        const segStr = JSON.stringify(watchedSegments);
        if (
            segStr === prevRef.current.segments &&
            watchedBg === prevRef.current.bg &&
            watchedBorderColor === prevRef.current.borderColor
        ) return;

        prevRef.current = {segments: segStr, bg: watchedBg, borderColor: watchedBorderColor};

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setPreviewSegments(watchedSegments);
            setPreviewBg(watchedBg);
            setPreviewBorderColor(watchedBorderColor);
        }, 300);

        return () => clearTimeout(timerRef.current);
    }, [watchedSegments, watchedBg, watchedBorderColor]);

    return <WheelPreview segments={previewSegments} backgroundColor={previewBg} borderColor={previewBorderColor}/>;
};