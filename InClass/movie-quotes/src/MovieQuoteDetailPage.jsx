import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailAppBar from "./DetailAppBar";

import { Card, CardContent, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import MovieIcon from "@mui/icons-material/Movie";
import fbMovieQuoteDocumentManager from "./FbMovieQuoteDocumentManager.js";
import QuoteDialog from "./QuoteDialog";

export default function MovieQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docSnapshot, setDocSnapshot] = useState(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = fbMovieQuoteDocumentManager.beginListening(id, () => {
      console.log("The data changed");
      setDocSnapshot(fbMovieQuoteDocumentManager.documentSnapshot);
      console.log("Page data:", fbMovieQuoteDocumentManager.documentSnapshot);
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <>
      <DetailAppBar
        onHome={() => {
          navigate(`/`);
        }}
        onEdit={() => {
          console.log("Clicked edit");
          setIsEditDialogOpen(true);
        }}
        onDelete={() => {
          console.log("Clicked delete");

          fbMovieQuoteDocumentManager.delete(id);
          navigate(`/`);
        }}
      />
      <div className="p-20 bg-gray-300 min-h-screen">
        <Typography variant="h5">Quote:</Typography>
        <br></br>
        <Card>
          <CardContent sx={{ display: "flex", gap: "10px" }}>
            <FormatQuoteIcon />

            {docSnapshot?.data()?.quote ?? "loading"}
          </CardContent>
        </Card>
        <br></br>
        <br></br>
        <Typography variant="h5">Movie:</Typography>
        <br></br>
        <Card>
          <CardContent sx={{ display: "flex", gap: "10px" }}>
            <MovieIcon />

            {docSnapshot?.data()?.movie ?? "loading"}
          </CardContent>
        </Card>
      </div>

      <QuoteDialog
        mqData={docSnapshot?.data()}
        isOpen={isEditDialogOpen}
        negativeAction={() => {
          setIsEditDialogOpen(false);
        }}
        positiveAction={(quote, movie) => {
          fbMovieQuoteDocumentManager.update(id, quote, movie);
          setIsEditDialogOpen(false);
        }}
      />
    </>
  );
}
