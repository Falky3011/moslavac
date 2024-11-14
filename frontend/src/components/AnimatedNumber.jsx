import React, { useState, useEffect } from 'react';


export function AnimatedNumber({ value }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 1000; // Animation duration in milliseconds
        const steps = 60; // Number of steps in the animation
        const stepValue = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current > value) {
                clearInterval(timer);
                setDisplayValue(value);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue}</span>;
};