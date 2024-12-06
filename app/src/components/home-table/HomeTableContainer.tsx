import { useQuery } from "@tanstack/react-query";

import { getFiles } from "../../api";
import { usePath } from "../../store";
import { getResourcesUrl } from "../../utils";
import { Error, Loader } from "../common";
import HomeTable from "./HomeTable";

function HomeTableContainer() {
    const { path, setPath } = usePath();
    const { data, isPending, error } = useQuery({
        queryKey: ["resources", [path]],
        queryFn: () => getFiles(getResourcesUrl(path))
    });

    if (isPending) return <Loader />;

    if (error) return <Error message={error.message} />;

    return <HomeTable data={data} path={path} setPath={setPath} />;
}

export default HomeTableContainer;
