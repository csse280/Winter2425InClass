import { useState } from "react";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";
import QuoteDialog from "./QuoteDialog.jsx";

export default function MovieQuotesListPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <MyAppBar />
      <MyFab
        onClick={() => {
          console.log("The FAB was clicked");
          setIsDialogOpen(true);
        }}
      />
      <QuoteDialog
        isOpen={isDialogOpen}
        positiveAction={(quote, movie) => {
          console.log("TODO: upload", quote, movie);

          // TODO: Actually do it!

          setIsDialogOpen(false);
        }}
        negativeAction={() => {
          console.log("You hit cancel or closed the dialog");
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}
