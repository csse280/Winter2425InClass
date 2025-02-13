/* eslint-disable react/prop-types */
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MovieIcon from "@mui/icons-material/Movie";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";

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
        
        primary={
            <Typography noWrap>
              {snapshotData.quote}
            </Typography>
          }
          secondary={
            <Typography noWrap>
              {snapshotData.movie}
            </Typography>
          }
      />
      <ChevronRightIcon />
    </ListItem>
  );
}
