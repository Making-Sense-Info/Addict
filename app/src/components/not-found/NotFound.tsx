import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Footer, TopBar } from "@components/common";

type NotFoundProps = {
    message?: string;
};

const NotFound = ({ message }: NotFoundProps) => {
    const navigate = useNavigate();
    return (
        <>
            {!message && <TopBar />}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "90vh",
                    textAlign: "center",
                    gap: 2,
                    p: 2,
                    backgroundColor: "background.default",
                    color: "text.primary"
                }}
            >
                <Typography variant="h6" fontSize="1.2rem">
                    {message || "Page not found"}
                </Typography>
                <Button variant="contained" color="primary" size="large" onClick={() => navigate("/")}>
                    Go Home
                </Button>
            </Box>
            {!message && <Footer />}
        </>
    );
};

export default NotFound;
