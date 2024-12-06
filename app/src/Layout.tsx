import { Outlet } from "react-router-dom";

import { TopBar } from "@components/common";

const Layout: React.FC = () => (
    <>
        <TopBar />
        <Outlet />
    </>
);

export default Layout;
