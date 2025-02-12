import { useEffect, useState } from "react";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";
import QuoteDialog from "./QuoteDialog.jsx";
import fbMovieQuotesCollectionManager from "./FbMovieQuotesCollectionManager.js";

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

      <div className="mt-12">
        <ul>
          {documentSnapshots.map((documentSnapshot) => (
            <li key={documentSnapshot.id}>
                {documentSnapshot.data().quote} -from {documentSnapshot.data().movie}
            </li>
          ))}
        </ul>
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
