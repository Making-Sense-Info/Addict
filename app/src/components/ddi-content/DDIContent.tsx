import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Checkbox,
    FormControlLabel,
    TablePagination,
    IconButton,
    Tooltip,
    Box,
    Chip,
    Paper
} from "@mui/material";
import { useEffect, useRef } from "react";
import React, { useState } from "react";

import { CATEGORY_SCHEME_TYPE } from "@utils/contants";

import { DDIBaseObject } from "@model/ddi";

interface Row {
    id: string;
    label: string;
    type: typeof CATEGORY_SCHEME_TYPE;
}

type DDIContentProps = {
    objects: DDIBaseObject[];
};

export default function DDIContent({ objects }: DDIContentProps) {
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<keyof Row>("label");
    const [filterText, setFilterText] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<Set<Row["type"]>>(
        new Set([CATEGORY_SCHEME_TYPE])
    );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (property: keyof Row) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleTypeChange = (type: Row["type"]) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRows = objects
        .filter(row => {
            return (
                row.id.includes(filterText) || row.label.toLowerCase().includes(filterText.toLowerCase())
            );
        })
        .filter(row => selectedTypes.has(row.type))
        .sort((a, b) => {
            if (orderBy === "id" || orderBy === "label") {
                const valueA = a[orderBy].toLowerCase();
                const valueB = b[orderBy].toLowerCase();
                return (valueA < valueB ? -1 : 1) * (order === "asc" ? 1 : -1);
            }
            return 0;
        });

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const typeColors: Record<Row["type"], string> = {
        [CATEGORY_SCHEME_TYPE]: "primary"
    };

    return (
        <Paper sx={{ width: "80%", margin: "auto", marginTop: "2em" }}>
            <Box sx={{ display: "flex", justifyContent: "center", margin: "16px" }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    sx={{ width: "50%" }}
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    width: "30%"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "id"}
                                    direction={order}
                                    onClick={() => handleSort("id")}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    width: "45%"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === "label"}
                                    direction={order}
                                    onClick={() => handleSort("label")}
                                >
                                    Label
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Type
                                    <TypeFilter
                                        types={["file", "dir"]}
                                        selectedTypes={selectedTypes}
                                        onToggleType={handleTypeChange}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: "5%" }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell
                                    sx={{
                                        padding: 1,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "200px"
                                    }}
                                >
                                    {row.id + row.id}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        padding: 1,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "200px"
                                    }}
                                >
                                    {row.label}
                                </TableCell>
                                <TableCell sx={{ padding: 1, textAlign: "center" }}>
                                    <Chip label={row.type} color={typeColors[row.type]} />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            alert("Coming soon");
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

const TypeFilter = ({ types, selectedTypes, onToggleType }) => {
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
                        zIndex: 10,
                        padding: 1,
                        maxHeight: 200,
                        overflowY: "auto"
                    }}
                >
                    {types.map(type => (
                        <FormControlLabel
                            key={type}
                            control={
                                <Checkbox
                                    checked={selectedTypes.has(type)}
                                    onChange={() => onToggleType(type)}
                                />
                            }
                            label={type}
                        />
                    ))}
                </Paper>
            )}
        </Box>
    );
};
