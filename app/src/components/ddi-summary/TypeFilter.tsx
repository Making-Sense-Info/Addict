import FilterListIcon from "@mui/icons-material/FilterList";
import { Checkbox, FormControlLabel, IconButton, Tooltip, Box, Paper } from "@mui/material";
import { useRef, useState } from "react";

import { useClickOutside } from "@hooks/click";

import { getTitle } from "@utils/xml";

import { DDIObjectID } from "@model/ddi";

type TypeFilterProps = {
    types: Array<DDIObjectID>;
    selectedTypes: Set<DDIObjectID>;
    onToggleType: (d: DDIObjectID) => void;
};

const TypeFilter = ({ types, selectedTypes, onToggleType }: TypeFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const filterRef = useRef(null);

    useClickOutside(filterRef, () => setIsOpen(false));

    return (
        <Box sx={{ position: "relative" }}>
            <Tooltip title="Filter by Type">
                <IconButton size="small" onClick={() => setIsOpen(prev => !prev)}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            {isOpen && (
                <Paper
                    ref={filterRef}
                    elevation={3}
                    sx={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        zIndex: 1000,
                        padding: 1,
                        paddingLeft: 3,
                        width: "250px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {types
                        .sort((a, b) => (a > b ? 1 : -1))
                        .map(type => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={selectedTypes.has(type)}
                                        onChange={() => onToggleType(type)}
                                    />
                                }
                                label={getTitle(type)}
                            />
                        ))}
                </Paper>
            )}
        </Box>
    );
};

export default TypeFilter;
