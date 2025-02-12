import { useState } from "react";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";
import QuoteDialog from "./QuoteDialog.jsx";
import fbMovieQuotesCollectionManager from "./FbMovieQuotesCollectionManager.js";

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
          fbMovieQuotesCollectionManager.add(quote, movie);
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
