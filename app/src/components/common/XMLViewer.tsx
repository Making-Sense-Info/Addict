import { useTheme } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import xmlFormatter from "xml-formatter";

type XMLViewerProps = {
    xmlCode: string;
};

const XMLViewer = ({ xmlCode }: XMLViewerProps) => {
    const theme = useTheme();
    const syntaxStyle = theme.palette.mode === "dark" ? oneDark : oneLight;

    const formattedXML = xmlFormatter(xmlCode, { indentation: "    " });

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
