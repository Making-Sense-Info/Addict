import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { assert } from "tsafe";

import { Error, Loader } from "@components/common";
import NotFound from "@components/not-found";

import { getContent } from "@api/file-content";

import { getResourcesUrl } from "@utils/env";
import { getDDIObject } from "@utils/xml";

import { DDIObjectIDs } from "@model/index";

import DDIObject from "./DDIObject";

const DDIObjectConstainer = () => {
    const { objectType, id } = useParams();
    const [searchParams] = useSearchParams();
    const path = searchParams.get("path") ?? "";
    const { data, isPending, error } = useQuery({
        queryKey: ["content", [path]],
        queryFn: () => getContent(getResourcesUrl(path))
    });

    if (!path) return <NotFound message={"DDI file path is undefined"} />;

    if (isPending) return <Loader />;

    if (error) return <Error message={error.message} />;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");

    assert(objectType !== undefined && id !== undefined);

    const type = objectType as DDIObjectIDs;

    const object = getDDIObject(xmlDoc, type, id);

    return <DDIObject type={type} object={object} path={path} />;
};

export default DDIObjectConstainer;
