export const decodeBase64 = (input: string) => {
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const binary = Uint8Array.from(
        window
            .atob(base64)
            .split("")
            .map(char => char.charCodeAt(0))
    );
    return new TextDecoder().decode(binary);
};
