import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Breadcrumb({ links }) {
    return (
        <Breadcrumbs aria-label="breadcrumb" separator="›">
            {links.map((link, index) =>
                index < links.length - 1 ? (
                <Link
                    key={index}
                    component={RouterLink}
                    to={link.to}
                    underline="hover"
                    color="inherit"
                >
                    {link.label}
                </Link>
                ) : (
                <Typography key={index} color="text.primary">
                    {link.label}
                </Typography>
                )
            )}
        </Breadcrumbs>
    );
}
