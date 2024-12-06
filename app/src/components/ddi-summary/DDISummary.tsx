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
    TablePagination,
    IconButton,
    Box,
    Chip,
    Paper
} from "@mui/material";
import React, { useState } from "react";

import { TruncatedTableCell } from "@components/common";

import { CATEGORY_SCHEME, DDI_OBJECTS } from "@utils/contants";

import { DDIBaseObject } from "@model/ddi";
import { type DDIObjectTypes } from "@model/index";

import TypeFilter from "./TypeFilter";

interface Row {
    id: string;
    label: string;
    type: DDIObjectTypes;
}

type DDISummaryProps = {
    objects: DDIBaseObject[];
};

const typeColors: Record<Row["type"], any> = {
    [CATEGORY_SCHEME]: "primary"
};

const DDISummary = ({ objects }: DDISummaryProps) => {
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<keyof Row>("label");
    const [filterText, setFilterText] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<Set<Row["type"]>>(new Set(DDI_OBJECTS));
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
                                        types={DDI_OBJECTS}
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
                                <TruncatedTableCell maxWidth={200}>{row.id}</TruncatedTableCell>
                                <TruncatedTableCell maxWidth={200}>{row.label}</TruncatedTableCell>
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
                sx={{ zIndex: -1 }}
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
};

export default DDISummary;
