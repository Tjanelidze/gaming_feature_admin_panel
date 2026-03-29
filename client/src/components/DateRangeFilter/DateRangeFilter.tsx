import {Box, TextField, Typography} from '@mui/material';
import {CalendarMonth} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {dateRangeFilterStyles} from './DateRangeFilter.styles.ts';

interface DateRangeFilterProps {
    label: string;
    fromValue: string;
    toValue: string;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
    onClear: () => void;
}

export const DateRangeFilter = ({
                                    label,
                                    fromValue,
                                    toValue,
                                    onFromChange,
                                    onToChange,
                                    onClear,
                                }: DateRangeFilterProps) => {
    const hasValue = !!fromValue || !!toValue;
    const today = new Date().toISOString().split('T')[0];
    const [fromFocused, setFromFocused] = useState(false);
    const [toFocused, setToFocused] = useState(false);

    useEffect(() => {
        if (!fromValue) setFromFocused(false);
        if (!toValue) setToFocused(false);
    }, [fromValue, toValue]);

    return (
        <Box sx={dateRangeFilterStyles.container()}>
            <CalendarMonth sx={{fontSize: 14, color: 'text.disabled'}}/>
            <Typography variant="caption" color="text.secondary" sx={dateRangeFilterStyles.label()}>
                {label}:
            </Typography>
            <TextField
                type={fromFocused || fromValue ? 'date' : 'text'}
                size="small"
                value={fromValue}
                placeholder={fromFocused ? undefined : 'From'}
                onChange={(e) => onFromChange(e.target.value)}
                onFocus={() => setFromFocused(true)}
                onBlur={() => !fromValue && setFromFocused(false)}
                inputProps={{max: toValue || today}}
                sx={dateRangeFilterStyles.input()}
            />
            <Typography sx={dateRangeFilterStyles.separator()}>—</Typography>
            <TextField
                type={toFocused || toValue ? 'date' : 'text'}
                size="small"
                value={toValue}
                placeholder={toFocused ? undefined : 'To'}
                onChange={(e) => onToChange(e.target.value)}
                onFocus={() => setToFocused(true)}
                onBlur={() => !toValue && setToFocused(false)}
                inputProps={{min: fromValue || today}}
                sx={dateRangeFilterStyles.input()}
            />
            {hasValue && (
                <Typography
                    variant="caption"
                    onClick={onClear}
                    sx={dateRangeFilterStyles.clearButton()}
                >
                    Clear
                </Typography>
            )}
        </Box>
    );
};