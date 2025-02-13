import { useParams } from "react-router-dom";

export default function MovieQuoteDetailPage() {
    const { id } = useParams();


    return (
        <div>
          <h2>Movie Quote Detail</h2>
          <p>Quote ID: {id}</p>
        </div>
    );
}