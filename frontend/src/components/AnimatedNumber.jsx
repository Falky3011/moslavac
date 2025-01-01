import React, { useState, useEffect } from 'react';

export function AnimatedNumber({ value }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 1000;
        const steps = 60;
        const interval = duration / steps;
        const stepValue = value / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const nextValue = Math.min(stepValue * currentStep, value);
            setDisplayValue(Math.floor(nextValue));

            if (nextValue >= value) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue}</span>;
}
