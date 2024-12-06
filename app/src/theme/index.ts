import { createTheme } from "@mui/material/styles";

const sharedColors = {
    primary: {
        main: "#4B8E3C"
    },
    secondary: {
        main: "#688a60"
    }
};

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        ...sharedColors,
        background: {
            default: "#ffffff",
            paper: "#f5f5f5"
        },
        text: {
            primary: "#000000",
            secondary: "#333333"
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        ...sharedColors,
        background: {
            default: "#121212",
            paper: "#1d1d1d"
        },
        text: {
            primary: "#ffffff",
            secondary: "#aaaaaa"
        }
    }
});
