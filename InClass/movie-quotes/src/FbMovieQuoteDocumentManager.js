import { db } from "./firebaseConfig.js";
import {
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { collectionMovieQuotes, keyQuote, keyMovie, keyLastTouched } from "./FbConstants.js"; 

class FbMovieQuoteDocumentManager {
  constructor() {
    this.documentSnapshot = undefined;
  }

  beginListening(id, changeListener) {
    console.log("setupListening for", id);
    return onSnapshot(doc(db, collectionMovieQuotes, id), (doc) => {
      this.documentSnapshot = doc;
      console.log("Current data: ", doc.data());
      changeListener();
    });
  }

  async update(id, quote, movie) {
    await updateDoc(doc(db, collectionMovieQuotes, id), {
      [keyQuote]: quote,
      [keyMovie]: movie,
      [keyLastTouched]: serverTimestamp(),
    });
  }

  async delete(id) {
    await deleteDoc(doc(db, collectionMovieQuotes, id));
  }
}
const instance = new FbMovieQuoteDocumentManager();
export default instance;
