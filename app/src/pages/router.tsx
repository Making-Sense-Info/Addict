import { createBrowserRouter } from "react-router-dom";

import FilePage from "@pages/FilePage";
import HomePage from "@pages/Home";

import Layout from "../Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/file/*", element: <FilePage /> }
        ]
    }
]);
