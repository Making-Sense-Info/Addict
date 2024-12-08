import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
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
    Paper,
    useTheme
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TruncatedTableCell } from "@components/common";

import { getBadgeColor } from "@utils/badges";
import { DDI_OBJECTS } from "@utils/contants";
import { getTitle } from "@utils/xml";

import { DDIBaseObject } from "@model/ddi";
import { type DDIObjectIDs } from "@model/index";

import TypeFilter from "./TypeFilter";

interface Row {
    URN: string;
    label: string;
    type: DDIObjectIDs;
}

type DDISummaryProps = {
    objects: DDIBaseObject[];
    path: string;
};

const DDISummary = ({ objects, path }: DDISummaryProps) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
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
                row.URN.includes(filterText) ||
                row.label.toLowerCase().includes(filterText.toLowerCase())
            );
        })
        .filter(row => selectedTypes.has(row.type))
        .sort((a, b) => {
            if (orderBy === "URN" || orderBy === "label") {
                const valueA = a[orderBy].toLowerCase();
                const valueB = b[orderBy].toLowerCase();
                return (valueA < valueB ? -1 : 1) * (order === "asc" ? 1 : -1);
            }
            return 0;
        });

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const getColor = (id: DDIObjectIDs) => getBadgeColor(palette.primary.main)(id);

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
                                    active={orderBy === "URN"}
                                    direction={order}
                                    onClick={() => handleSort("URN")}
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
                            <TableRow
                                key={row.URN}
                                onClick={() => {
                                    navigate(`/${row.type}/${row.URN.split(":")[1]}?path=${path}`);
                                }}
                                hover={true}
                            >
                                <TruncatedTableCell maxWidth={200}>{row.URN}</TruncatedTableCell>
                                <TruncatedTableCell maxWidth={200}>{row.label}</TruncatedTableCell>
                                <TableCell sx={{ padding: 1, textAlign: "center" }}>
                                    <Chip
                                        label={getTitle(row.type)}
                                        sx={{ backgroundColor: getColor(row.type) }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary">
                                        <ContentCopyIcon />
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
