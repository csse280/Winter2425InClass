// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { query, where, onSnapshot } from "firebase/firestore";
// import { db } from "./firebaseConfig.js";
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

  // async function spikeTestWrite() {
  //   console.log("Write to the firestore database");
  //   try {
  //     const docRef = await addDoc(collection(db, "MovieQuotes"), {
  //       quote: "Spike quote",
  //       movie: "Spike movie",
  //       lastTouched: serverTimestamp(),
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  return (
    <>
      <MovieQuotesListPage />
    </>
  );
}

export default App;
