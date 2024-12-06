import Typography from "@mui/material/Typography";

type ErrorType = { message: string };

const Error = ({ message }: ErrorType) => (
    <Typography color="error" variant="body1" sx={{ marginTop: "20px" }}>
        {message}
    </Typography>
);

export default Error;
