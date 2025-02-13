/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import MovieQuoteRow from './MovieQuoteRow';
import { useNavigate } from "react-router-dom";

export default function MovieQuoteList({ snapshots }) {
    const navigate = useNavigate();

  return (
    <List>
      {snapshots.map((documentSnapshot) => (
        <MovieQuoteRow
        key={documentSnapshot.id}
        snapshotData={documentSnapshot.data()}
        onClick={() => {
            console.log("Click row for id", documentSnapshot.id);
            navigate(`/quote/${documentSnapshot.id}`);
        }}
        />
      ))}
    </List>
  );
}
