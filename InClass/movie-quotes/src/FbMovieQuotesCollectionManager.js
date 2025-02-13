import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";  
import { db } from "./firebaseConfig.js";

const collectionMovieQuotes = "MovieQuotes";
const keyQuote = "quote";
const keyMovie = "movie";
const keyLastTouched = "lastTouched";

class FbMovieQuotesCollectionManager {
  constructor() {
    this.documentSnapshots = [];
    this._ref = collection(db, collectionMovieQuotes);
  }

  beginListening(changeListener) {
    // const q = query(collection(db, "MovieQuotes"), where("state", "==", "CA"));
    const q = query(this._ref, orderBy(keyLastTouched, "desc"));
    return onSnapshot(q, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log("Document id:", doc.id);
    //     console.log("Document data:", doc.data());
    //   });
      this.documentSnapshots = querySnapshot.docs;
      changeListener();
    });
  }

  async add(quote, movie) {
    console.log("Write to the firestore database", quote, movie);
    try {
      const docRef = await addDoc(this._ref, {
        [keyQuote]: quote,
        [keyMovie]: movie,
        [keyLastTouched]: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

const instance = new FbMovieQuotesCollectionManager();
export default instance;
