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
            const { encoding, content, download_url } = r;
            if (!content && download_url) {
                return fetch(download_url).then(r => r.text());
            }
            if (encoding === "base64") {
                return decodeBase64(content);
            }
            return content;
        });
