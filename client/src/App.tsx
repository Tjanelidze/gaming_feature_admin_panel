import {CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";
import {ThemeContextProvider, useThemeContext} from "./context/ThemeContext.tsx";
import {rootTheme} from "./styles/root.theme.ts";

const ThemedApp = () => {
    const {mode} = useThemeContext();

    return (
        <ThemeProvider theme={rootTheme(mode)}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
};

export const App = () => (
    <ThemeContextProvider>
        <ThemedApp/>
    </ThemeContextProvider>
);

export default App;
