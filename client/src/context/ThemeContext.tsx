import {createContext, type ReactNode, useContext, useState} from "react";

interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'dark',
    toggleMode: () => {
    },
});

const getInitialMode = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('themeMode');

    return (stored === 'light' || stored === 'dark') ? stored : 'dark';
};

export const ThemeContextProvider = ({children}: { children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('themeMode', next);

            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{mode, toggleMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);