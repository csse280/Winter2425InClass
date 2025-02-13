/* eslint-disable react/prop-types */
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MovieIcon from "@mui/icons-material/Movie";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function MovieQuoteRow({ snapshotData, onClick }) {
  return (
    <ListItem
      button="true"
      onClick={onClick}
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <ListItemAvatar>
        <Avatar>
          <MovieIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ flexGrow: 1 }}
        primary={snapshotData.quote}
        secondary={snapshotData.movie}
      />
      <ChevronRightIcon />
    </ListItem>
  );
}
