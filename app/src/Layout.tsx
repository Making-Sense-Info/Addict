import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer, TopBar } from "@components/common";

const Layout: React.FC = () => (
    <Box
        sx={{
            height: "calc(95vh)",
            overflow: "scroll",
            width: "100%"
        }}
    >
        <TopBar />
        <Outlet />
        <Footer />
    </Box>
);

export default Layout;
