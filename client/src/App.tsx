import {CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";
import {ThemeContextProvider, useThemeContext} from "./context/ThemeContext.tsx";
import {rootTheme} from "./styles/root.theme.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import {colors} from "@/styles/colors.style.ts";
import {ErrorBoundary} from "@/components/ErrorBoundary/ErrorBoundary.tsx";

const queryClient = new QueryClient();

const ThemedApp = () => {
    const {mode} = useThemeContext();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={rootTheme(mode)}>
                <CssBaseline/>
                <ErrorBoundary>
                    <RouterProvider router={router}/>
                </ErrorBoundary>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: mode === 'dark' ? colors.toast.dark : colors.toast.light,
                            color: mode === 'dark' ? colors.toast.darkText : colors.toast.lightText,
                        },
                        success: {
                            iconTheme: {
                                primary: colors.primary.main,
                                secondary: mode === 'dark' ? colors.background.dark : colors.background.lightPaper,
                            },
                        },
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
};


export const App = () => (
    <ThemeContextProvider>
        <ThemedApp/>
    </ThemeContextProvider>
);

export default App;
