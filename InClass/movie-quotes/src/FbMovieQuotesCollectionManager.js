import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

const collectionMovieQuotes = "MovieQuotes";
const keyQuote = "quote";
const keyMovie = "movie";
const keyLastTouched = "lastTouched";

class FbMovieQuotesCollectionManager {
  constructor() {
    this.documentSnapshots = [];
  }

  beginListening(changeListener) {}

  stopListening() {}

  async add(quote, movie) {
    console.log("Write to the firestore database", quote, movie);
    try {
      const docRef = await addDoc(collection(db, collectionMovieQuotes), {
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
