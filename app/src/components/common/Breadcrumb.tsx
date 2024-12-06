import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

type GitHubBreadcrumbsProps = {
    path: string;
    setPath: (p: string) => void;
};

function GitHubBreadcrumbs({ path, setPath }: GitHubBreadcrumbsProps) {
    const items = path.split("/");
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {items.map((item, index) => (
                <Typography
                    component={"h6"}
                    key={index}
                    onClick={() => setPath(items.slice(0, index + 1).join("/"))}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        marginTop: "0.2em",
                        marginBottom: "0.2em",
                        "&:hover": {
                            textDecoration: "underline"
                        }
                    }}
                >
                    {item === "resources" ? (
                        <>
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Home
                        </>
                    ) : (
                        item
                    )}
                </Typography>
            ))}
        </Breadcrumbs>
    );
}

export default GitHubBreadcrumbs;
