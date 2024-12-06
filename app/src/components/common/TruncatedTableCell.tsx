import { TableCell, Tooltip } from "@mui/material";
import { useRef, useState, useEffect, ReactNode } from "react";

type TruncatedTableCellProps = {
    children: ReactNode;
    maxWidth?: number;
};

const TruncatedTableCell = ({ children, maxWidth = 150 }: TruncatedTableCellProps) => {
    const cellRef = useRef<HTMLInputElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (cellRef.current) {
                setIsOverflow(cellRef.current.scrollWidth > cellRef.current.clientWidth);
            }
        };
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, [children]);

    return (
        <Tooltip title={isOverflow ? children : ""} arrow placement="top">
            <TableCell
                ref={cellRef}
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: `${maxWidth}px`
                }}
            >
                {children}
            </TableCell>
        </Tooltip>
    );
};

export default TruncatedTableCell;
