import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@store/index";

import ThemeSwitcher from "./ThemeSwitcher";

const TopBar = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const updateTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Home Icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    onClick={() => navigate("/")}
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>

                {/* Addict Logo */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        height: "25px"
                    }}
                    onClick={() => navigate("/")}
                >
                    <img src={"/addict.svg"} className="logo" alt="Addict logo" />
                </Box>

                {/* Theme Switcher */}
                <ThemeSwitcher isDarkMode={theme === "dark"} toggleTheme={updateTheme} />
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
