/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DetailAppBar({onHome, onEdit, onDelete}) {
  return (
    <AppBar position="fixed"  sx={{ backgroundColor: 'var(--color-rosered)' }}>
      <Toolbar>
        <Typography onClick={onHome}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, cursor: "pointer" }}>
          Movie Quotes
        </Typography>
        <IconButton
          color="inherit"
          aria-label="edit"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="delete"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
