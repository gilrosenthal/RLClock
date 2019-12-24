import React from 'react';
export const SettingsContext = React.createContext({
    config: {
        blocks: {},
        calendarDate:""
    },
    setConfig: () => { }
});
