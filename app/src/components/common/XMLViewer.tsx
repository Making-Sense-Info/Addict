// @ts-nocheck
import { useTheme } from "@mui/material";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import xmlFormatter from "xml-formatter";

type XMLViewerProps = {
    xmlCode: string;
};

const MAX_LINES = 100;

const XMLViewer = ({ xmlCode }: XMLViewerProps) => {
    const theme = useTheme();
    const syntaxStyle = theme.palette.mode === "dark" ? oneDark : oneLight;

    const lines = xmlCode.split("\n");
    const totalLines = lines.length;

    let displayedCode = xmlCode;

    if (totalLines > MAX_LINES) {
        const startLines = lines.slice(0, MAX_LINES / 2).join("\n");
        const endLines = lines.slice(-MAX_LINES / 2).join("\n");
        displayedCode = `${startLines}\n\n[...]\n\n${endLines}`;
    }

    const formattedXML = xmlFormatter(displayedCode, { indentation: "    " });

    return (
        <SyntaxHighlighter
            language="xml"
            style={syntaxStyle}
            showLineNumbers
            customStyle={{
                fontSize: "0.9rem"
            }}
        >
            {formattedXML}
        </SyntaxHighlighter>
    );
};

export default XMLViewer;
