import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailAppBar from "./DetailAppBar";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { FormatQuote, Movie } from "@mui/icons-material";
import fbMovieQuoteDocumentManager from "./FbMovieQuoteDocumentManager.js";
import QuoteDialog from "./QuoteDialog.jsx";

export default function MovieQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentSnapshot, setDocumentSnapshot] = useState(undefined);

  useEffect(() => {
    // Subscribe
    const unsubscribe = fbMovieQuoteDocumentManager.beginListening(id, () => {
      console.log("The data has changed!");
      setDocumentSnapshot(fbMovieQuoteDocumentManager.documentSnapshot);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, [id]);

  return (
    <>
      <DetailAppBar
        onHome={() => {
          navigate("/");
        }}
        onEdit={() => {
          console.log("Clicked edit");
          setIsDialogOpen(true);
        }}
        onDelete={() => {
          fbMovieQuoteDocumentManager.delete(id);
          navigate("/");
        }}
      />
      <div className="p-20 bg-gray-300 min-h-screen">
        <Typography variant="h5">Quote:</Typography>
        <Card>
          <CardContent>
            <FormatQuote /> {documentSnapshot?.data().quote ?? "Loading"}
          </CardContent>
        </Card>
        <br></br>
        <Typography variant="h5">Movie:</Typography>
        <Card>
          <CardContent>
            <Movie /> {documentSnapshot?.data().movie ?? "Loading"}
          </CardContent>
        </Card>
      </div>

      <QuoteDialog
        isOpen={isDialogOpen}
        movieQuoteData={documentSnapshot?.data()}
        negativeAction={() => {
          setIsDialogOpen(false);
        }}
        positiveAction={(quote, movie) => {
          fbMovieQuoteDocumentManager.update(id, quote, movie);
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}
