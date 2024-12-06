import { getHeaders } from "@utils/index";

import { ResourceType } from "@model/index";

export const getFiles = (url: string) =>
    fetch(url, { headers: getHeaders() })
        .then(r => {
            if (r.ok) {
                return r.json();
            }
            throw new Error(`API returns: ${r.status}`);
        })
        .then(r => r as ResourceType[])
        .then(r =>
            r.filter(({ type, name }) => type === "dir" || (type === "file" && name.endsWith(".xml")))
        );
