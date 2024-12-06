import Typography from "@mui/material/Typography";

type ErrorType = { message: string };

const Error = ({ message }: ErrorType) => (
    <Typography color="error" variant="body1">
        {message}
    </Typography>
);

export default Error;
