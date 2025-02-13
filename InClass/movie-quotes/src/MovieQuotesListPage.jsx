import { useEffect, useState } from "react";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";
import QuoteDialog from "./QuoteDialog.jsx";
import fbMovieQuotesCollectionManager from "./FbMovieQuotesCollectionManager.js";
import MovieQuoteList from "./MovieQuoteList.jsx";

export default function MovieQuotesListPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentSnapshots, setDocumentSnapshots] = useState([]);

  useEffect(() => {
    const unsubscribe = fbMovieQuotesCollectionManager.beginListening(() => {
      console.log("The data has changed!");
      setDocumentSnapshots(fbMovieQuotesCollectionManager.documentSnapshots);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <MyAppBar />

      <div className="mt-14">
        <MovieQuoteList snapshots={documentSnapshots} />
      </div>

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
