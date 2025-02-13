/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import MovieQuoteRow from './MovieQuoteRow';


export default function MovieQuoteList({ snapshots }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {snapshots.map((documentSnapshot) => (
        <MovieQuoteRow
        key={documentSnapshot.id}
        snapshotData={documentSnapshot.data()}
        onClick={() => {
            console.log("Click row for id", documentSnapshot.id);
            // TODO: Navigate to the detail page for this id.
        }}
        />
      ))}
    </List>
  );
}
