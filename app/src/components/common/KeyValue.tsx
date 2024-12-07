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
                gap: 2
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
    );
};

export default KeyValueBox;
