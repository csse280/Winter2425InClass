import { deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

const collectionMovieQuotes = "MovieQuotes";
const keyQuote = "quote";
const keyMovie = "movie";
const keyLastTouched = "lastTouched";

class FbMovieQuoteDocumentManager {
  constructor() {
    this.documentSnapshot = undefined;
  }

  beginListening(id, changeListener) {
    return onSnapshot(doc(db, collectionMovieQuotes, id), (doc) => {
      console.log("Got a doc:", doc.data());
      this.documentSnapshot = doc;
      changeListener();
    });
  }

  async update(id, quote, movie) {
    console.log("Update to the firestore database", quote, movie);
    try {
      const pointerToDoc = doc(db, collectionMovieQuotes, id);
      updateDoc(pointerToDoc, {
        [keyQuote]: quote,
        [keyMovie]: movie,
        [keyLastTouched]: serverTimestamp(),
      });
      console.log("Document updated");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async delete(id) {
    const pointerToDoc = doc(db, collectionMovieQuotes, id);
    await deleteDoc(pointerToDoc);
  }
}

const instance = new FbMovieQuoteDocumentManager();
export default instance;
