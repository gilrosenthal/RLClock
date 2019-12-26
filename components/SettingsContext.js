import React from 'react';

export const initialValue = {
    blocks: {
        a: {
            name: "",
            isFree: false,
            lunchType:0 // 0 means not configured, 1 means first lunch, 2 means second lunch
        },
        b: {
            name: "",
            isFree: false,
            lunchType:0
        },
        c: {
            name: "",
            isFree: false,
            lunchType:0
        },
        d: {
            name: "",
            isFree: false,
            lunchType:0
        },
        e: {
            name: "",
            isFree: false,
            lunchType:0
        },
        f: {
            name: "",
            isFree: false,
            lunchType:0
        },
        g: {
            name: "",
            isFree: false,
            lunchType:0
        },
        h: {
            name: "",
            isFree: false,
            lunchType:0
        },
    },
    calendarDate: ""
}
export const SettingsContext = React.createContext(initialValue);
