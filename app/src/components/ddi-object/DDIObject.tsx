import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography, Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { KeyValue } from "@components/common";
import XMLViewer from "@components/common/XMLViewer";

import { getTitle } from "@utils/xml";

import { DDIDetailledObject, DDIObjectIDs } from "@model/ddi";

import Children from "../common/KeyValueList";
import LinkedObject from "./LinkedObject";

const langFlags: Record<string, string> = {
    "fr-FR": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    "en-UK": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
};

interface DDIObjectProps {
    type: DDIObjectIDs;
    object: DDIDetailledObject;
    path: string;
}

const DDIObject = ({ type, object, path }: DDIObjectProps) => {
    const navigate = useNavigate();
    const title = getTitle(type);
    const { URN, labels, containedIn, contains, code, value } = object;
    return (
        <Box
            sx={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "20px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative"
                }}
            >
                <IconButton onClick={() => navigate(`/summary?path=${path}`)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        flex: 1,
                        textAlign: "center"
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <KeyValue label={"URN"} values={URN} />
            {labels && (
                <KeyValue
                    label={"Label"}
                    values={Object.entries(labels).map(([lang, label]) => (
                        <Box
                            key={lang}
                            sx={{
                                display: "flex",
                                gap: 2,
                                padding: 1,
                                alignItems: "center"
                            }}
                        >
                            {langFlags[lang] ? (
                                <Avatar
                                    src={langFlags[lang]}
                                    alt={lang}
                                    sx={{ width: 32, height: 32, borderRadius: "50%" }}
                                />
                            ) : (
                                <Typography variant="body1">{lang}:</Typography>
                            )}
                            <Typography variant="body1">{label}</Typography>
                        </Box>
                    ))}
                />
            )}
            {value && <KeyValue label={"Value"} values={value} />}
            {containedIn && (
                <KeyValue
                    label={"Contained in"}
                    values={<LinkedObject item={containedIn} path={path} />}
                />
            )}
            {contains && <Children items={contains} path={path} />}
            {code && <KeyValue label={"DDI"} values={<XMLViewer xmlCode={code} />} />}
        </Box>
    );
};

export default DDIObject;
