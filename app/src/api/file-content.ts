import { decodeBase64, getHeaders } from "@utils/index";

export const getContent = (url: string) =>
    fetch(url, { headers: getHeaders() })
        .then(r => {
            if (r.ok) {
                return r.json();
            }
            throw new Error(`API returns: ${r.status}`);
        })
        .then(r => {
            if (r.encoding === "base64") {
                return decodeBase64(r.content);
            }
            return r.content;
        });
