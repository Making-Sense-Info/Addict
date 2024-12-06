import { createBrowserRouter } from "react-router-dom";

import FileSummaryPage from "@pages/FileSummaryPage";
import HomePage from "@pages/Home";
import ObjectPage from "@pages/ObjectPage";

import Layout from "../Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/summary", element: <FileSummaryPage /> },
            { path: "/:objectType/:id", element: <ObjectPage /> }
        ]
    }
]);
