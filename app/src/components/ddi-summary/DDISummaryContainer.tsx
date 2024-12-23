import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Loader, Error } from "@components/common";

import { getContent } from "@api/index";

import { getResourcesUrl } from "@utils/index";
import { getDDIObjects } from "@utils/xml";

import DDISummary from "./DDISummary";

function DDISummaryContainer() {
    const [searchParams] = useSearchParams();
    const path = searchParams.get("path") ?? "";

    const { data, isPending, error } = useQuery({
        queryKey: ["content", [path]],
        queryFn: () => getContent(getResourcesUrl(path))
    });

    if (isPending) return <Loader />;

    if (error) return <Error message={error.message} />;

    if (!data) return <Error message={"No data"} />;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");

    const objects = getDDIObjects(xmlDoc);

    return <DDISummary objects={objects} path={path} />;
}

export default DDISummaryContainer;
