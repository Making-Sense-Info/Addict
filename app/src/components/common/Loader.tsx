import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress sx={{ marginTop: "3em" }} color="secondary" size={100} />
    </div>
);

export default Loader;
