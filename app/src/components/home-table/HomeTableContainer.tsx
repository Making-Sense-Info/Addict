import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Navigate } from "react-router-dom";

import { Error, Loader } from "@components/common";

import { getFiles } from "@api/index";

import { getResourcesUrl, ROOT_SUB_PATH } from "@utils/index";

import HomeTable from "./HomeTable";

function HomeTableContainer() {
    const [searchParams] = useSearchParams();
    const path = searchParams.get("path") ?? "";
    const { data, isPending, error } = useQuery({
        queryKey: ["resources", [path]],
        queryFn: () => getFiles(getResourcesUrl(path))
    });

    if (!path) return <Navigate to={`/?path=${ROOT_SUB_PATH}`} replace />;

    if (isPending) return <Loader />;

    if (error) return <Error message={error.message} />;

    return <HomeTable data={data} path={path} />;
}

export default HomeTableContainer;
