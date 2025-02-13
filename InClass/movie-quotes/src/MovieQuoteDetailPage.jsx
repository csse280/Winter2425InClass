import { useParams } from "react-router-dom";
import DetailAppBar from "./DetailAppBar";

export default function MovieQuoteDetailPage() {
  const { id } = useParams();

  return (
    <DetailAppBar
      onEdit={() => {
        console.log("Clicked edit");
      }}
      onDelete={() => {
        console.log("Clicked delete");
      }}
    />

    // <div>
    //   <h2>Movie Quote Detail</h2>
    //   <p>Quote ID: {id}</p>
    // </div>
  );
}
