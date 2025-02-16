/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { useState, useEffect } from "react";

export default function QuoteDialog({
  mqData,
  isOpen,
  positiveAction,
  negativeAction,
}) {
  // const {
  //   mqData,
  //   isOpen,
  //   positiveAction,
  //   negativeAction,
  // } = props;

  console.log("Dialog", mqData);
  // console.log("props", props);
  // const [quote, setQuote] = useState("");
  // const [movie, setMovie] = useState("");

  // useEffect(() => {
  //   if (props.mqData !== undefined) {
  //     setQuote(props.mqData.quote);
  //     setMovie(props.mqData.quote);
  //   }
  // }, [props.mqData]); // Run only when props.mq changes

  return (
    <Dialog
      disableRestoreFocus
      open={isOpen}
      onClose={negativeAction}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            positiveAction(formJson.quote, formJson.movie);
          },
        },
      }}
    >
      <DialogTitle>{mqData ? "Edit Quote" : "Add a Quote"}</DialogTitle>
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
          defaultValue={mqData?.quote ?? ""}
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
          defaultValue={mqData?.movie ?? ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={negativeAction}>Cancel</Button>
        <Button type="submit">{mqData ? "Edit Quote" : "Add Quote"}</Button>
      </DialogActions>
    </Dialog>
  );
}
