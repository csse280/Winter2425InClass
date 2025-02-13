/* eslint-disable react/prop-types */
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MovieIcon from "@mui/icons-material/Movie";

export default function MovieQuoteRow({ snapshotData, onClick }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <MovieIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={snapshotData.quote}
        secondary={snapshotData.movie}
      />
    </ListItem>
  );
}
