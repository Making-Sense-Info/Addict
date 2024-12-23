import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ReactNode } from "react";

interface KeyValueBoxProps {
    label: string;
    values: string[] | string | ReactNode | ReactNode[];
}

const KeyValueBox: React.FC<KeyValueBoxProps> = ({ label, values }) => {
    const isList = Array.isArray(values);

    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                backgroundColor: "background.paper",
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "relative",
                maxHeight: "300px",
                overflowY: "auto",
                marginBottom: "10px"
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "text.secondary"
                }}
            >
                {label}
            </Typography>
            <Box
                sx={{
                    overflowY: "auto",
                    maxHeight: "100%",
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)"
                    }
                }}
            >
                {isList ? (
                    <List sx={{ pl: 2 }}>
                        {values.map((value, index) =>
                            value ? (
                                <ListItem key={index} disablePadding>
                                    <ListItemText
                                        primary={value}
                                        primaryTypographyProps={{
                                            variant: "body2",
                                            sx: { color: "text.primary" }
                                        }}
                                    />
                                </ListItem>
                            ) : null
                        )}
                    </List>
                ) : values ? (
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.primary",
                            pl: 2
                        }}
                    >
                        {values}
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
};

export default KeyValueBox;
