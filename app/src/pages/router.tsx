import { createBrowserRouter } from "react-router-dom";

import FileSummaryPage from "@pages/FileSummaryPage";
import HomePage from "@pages/Home";

import Layout from "../Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/file/*", element: <FileSummaryPage /> }
        ]
    }
]);
