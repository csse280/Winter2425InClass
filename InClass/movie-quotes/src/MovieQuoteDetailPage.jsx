import { useParams } from "react-router-dom";
import DetailAppBar from "./DetailAppBar";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { FormatQuote, Movie } from "@mui/icons-material";

export default function MovieQuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <DetailAppBar
        onHome={() => {
          console.log("Clicked Home");
          navigate("/");
        }}
        onEdit={() => {
          console.log("Clicked edit");
        }}
        onDelete={() => {
          console.log("Clicked delete");
        }}
      />
      <div className="p-20 bg-gray-300 min-h-screen">
        <Typography variant="h5">Quote:</Typography>
        <Card>
          <CardContent>
            <FormatQuote /> {"My quote will go here"}
          </CardContent>
        </Card>
        <br></br>
        <Typography variant="h5">Movie:</Typography>
        <Card>
          <CardContent>
            <Movie /> {"My movie title will go here"}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
