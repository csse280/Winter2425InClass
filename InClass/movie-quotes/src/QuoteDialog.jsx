/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function QuoteDialog({ isOpen, positiveAction, negativeAction}) {
  
  return (
      <Dialog
        open={isOpen}
        onClose={negativeAction}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              positiveAction(formJson.quote, formJson.movie);
            },
          },
        }}
      >
        <DialogTitle>Add Quote</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="quote"
            name="quote"
            label="Quote:"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="movie"
            name="movie"
            label="Movie:"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={negativeAction}>Cancel</Button>
          <Button type="submit">Add Quote</Button>
        </DialogActions>
      </Dialog>
  );
}