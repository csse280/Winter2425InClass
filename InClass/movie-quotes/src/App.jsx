// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { query, where, onSnapshot } from "firebase/firestore";
// import { db } from "./firebaseConfig.js";
import { useState } from "react";
import "./App.css";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";
import QuoteDialog from "./QuoteDialog.jsx";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <MyAppBar />
      <MyFab onClick={() => {
        console.log("The FAB was clicked");
        setIsDialogOpen(true);
      }}/>
      <QuoteDialog 
        isOpen={isDialogOpen}
        positiveAction={(quote, movie) => {
          console.log("TODO: upload", quote, movie);

          // TODO: Actually do it!

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

export default App;
