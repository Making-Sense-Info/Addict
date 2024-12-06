import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { router } from "@pages/router";

import { useTheme } from "@store/index";

import { lightTheme, darkTheme } from "@theme/index";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 5 * 60 * 1000 } }
});

const App = () => {
    const { theme } = useTheme();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <CssBaseline />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            theme === "dark"
                                ? darkTheme.palette.background.default
                                : lightTheme.palette.background.default
                    }}
                >
                    <RouterProvider router={router} />
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
