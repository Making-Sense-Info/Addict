import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb } from "@components/common";

import { type ResourceType } from "@model/index";

type HomeTableProps = {
    data: ResourceType[];
    path: string;
    setPath: (p: string) => void;
};

const HomeTable = ({ data, path, setPath }: HomeTableProps) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const sortedData = [...data].sort((a, b) => {
        if (a.type === b.type) {
            return a.name.localeCompare(b.name);
        }
        return a.type === "dir" ? -1 : 1;
    });

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <TableContainer component={Paper} sx={{ width: "40%", margin: "auto", marginTop: "2em" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", padding: 0.3 }}>
                            <Breadcrumb path={path} setPath={setPath} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", padding: 0.3, width: "10%" }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((item, index) => (
                        <TableRow key={index} sx={{ height: "2rem", borderBottom: "1px solid #ccc" }}>
                            <TableCell sx={{ padding: 0.3 }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {item.type === "dir" ? (
                                        <Typography
                                            component={"h6"}
                                            key={index}
                                            onClick={() => setPath(item.path)}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                textDecoration: "none",
                                                cursor: "pointer",
                                                marginTop: "0.2em",
                                                marginBottom: "0.2em",
                                                "&:hover": {
                                                    textDecoration: "underline"
                                                }
                                            }}
                                        >
                                            <FolderIcon color="primary" sx={{ mr: 1 }} /> {item.name}
                                        </Typography>
                                    ) : (
                                        <>
                                            <InsertDriveFileIcon color="action" sx={{ mr: 1 }} />{" "}
                                            {item.name}
                                        </>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell sx={{ padding: 0.3 }}>
                                {item.type === "file" && (
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            navigate(`/summary?path=${item.path}`);
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10]} // Fixed 10 rows per page
                component="div"
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </TableContainer>
    );
};

export default HomeTable;
