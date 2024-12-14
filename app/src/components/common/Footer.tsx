import { Box, useTheme } from "@mui/material";

const FloatingFooter: React.FC = () => {
    const { palette } = useTheme();
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: palette.primary.main,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                height: "5vh"
            }}
        >
            <span>{`v${__APP_VERSION__}`}</span>
            <a
                href="https://making-sense.info"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <img
                    src="https://making-sense.info/img/ill_making_sense_flat.svg"
                    alt="Making Sense"
                    style={{
                        width: "60px",
                        height: "auto"
                    }}
                />
            </a>
        </Box>
    );
};

export default FloatingFooter;
