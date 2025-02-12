import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MovieQuotesListPage from "./MovieQuotesListPage";

function App() {
  // function spikeTestRead() {
  //   console.log("TODO: Read from the firestore database");
  //   // const q = query(collection(db, "MovieQuotes"), where("state", "==", "CA"));
  //   const ref = collection(db, "MovieQuotes");
  //   const unsubscribe = onSnapshot(ref, (querySnapshot) => {

  //     querySnapshot.forEach((doc) => {
  //       console.log("Document id:", doc.id);
  //       console.log("Document data:", doc.data());
  //     });

  //   });
  // }

  return (
    <>
      <MovieQuotesListPage />
    </>
  );
}

export default App;
