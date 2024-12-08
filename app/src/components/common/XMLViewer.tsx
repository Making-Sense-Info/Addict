// @ts-nocheck
import DoneIcon from "@mui/icons-material/Done";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useTheme, Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
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
    const [copied, setCopied] = useState(false);

    const lines = xmlCode.split("\n");
    const totalLines = lines.length;

    let displayedCode = xmlCode;

    if (totalLines > MAX_LINES) {
        const startLines = lines.slice(0, MAX_LINES / 2).join("\n");
        const endLines = lines.slice(-MAX_LINES / 2).join("\n");
        displayedCode = `${startLines}\n\n[...]\n\n${endLines}`;
    }

    const formattedXML = xmlFormatter(displayedCode, { indentation: "    " });

    const handleCopy = () => {
        navigator.clipboard.writeText(xmlFormatter(xmlCode, { indentation: "    " }));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box
            sx={{
                position: "relative",
                // border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden"
            }}
        >
            {/* Copy Button */}
            <Tooltip title={copied ? "Copied!" : "Copy"}>
                <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: "background.paper",
                        "&:hover": { backgroundColor: "grey.100" }
                    }}
                >
                    {copied ? <DoneIcon fontSize="small" /> : <FileCopyIcon fontSize="small" />}
                </IconButton>
            </Tooltip>

            {/* XML Viewer */}
            <SyntaxHighlighter
                language="xml"
                style={syntaxStyle}
                showLineNumbers
                customStyle={{
                    fontSize: "0.9rem",
                    padding: "1rem"
                }}
            >
                {formattedXML}
            </SyntaxHighlighter>
        </Box>
    );
};

export default XMLViewer;
