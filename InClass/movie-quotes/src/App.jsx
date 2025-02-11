// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { query, where, onSnapshot } from "firebase/firestore";
// import { db } from "./firebaseConfig.js";
import "./App.css";
import MyAppBar from "./MyAppBar.jsx";
import MyFab from "./MyFab.jsx";

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
      <MyAppBar />
      <br></br>
      <br></br>
      <br></br>
      <MyFab onClick={() => {
        console.log("The FAB was clicked");
      }}/>
    </>
  );
}

export default App;
