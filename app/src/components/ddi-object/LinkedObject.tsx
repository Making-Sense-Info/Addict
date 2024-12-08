import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Chip, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getBadgeColor } from "@utils/badges";
import { getTitle } from "@utils/xml";

import { DDIBaseObject } from "@model/ddi";

type LinkedObjectProps = {
    item: DDIBaseObject;
    path: string;
};

const LinkedObject = ({ item, path }: LinkedObjectProps) => {
    const { URN, label, type } = item;
    const { palette } = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                padding: 0,
                alignItems: "center"
            }}
        >
            <Chip
                label={getTitle(type)}
                sx={{ backgroundColor: getBadgeColor(palette.primary.main)(type) }}
            />
            <Typography variant="body1">{label || URN}</Typography>
            <IconButton
                color="primary"
                onClick={() => {
                    navigate(`/${type}/${URN.split(":")[1]}?path=${path}`);
                }}
            >
                <LaunchIcon />
            </IconButton>
        </Box>
    );
};

export default LinkedObject;
