import { collection, query, where, getDocs, addDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebaseConfig_TEMP.js";  // Corrected the import to use your file name

export const updateSearchCount = async (searchTerm, movie) => {
  const searchCollection = collection(db, "metrics");  // Use the 'metrics' collection name here

  try {
    const q = query(searchCollection, where("searchTerm", "==", searchTerm));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {
        count: increment(1),  // Increment the count if searchTerm already exists
      });
    } else {
      await addDoc(searchCollection, {
        searchTerm,
        count: 1,  // If it's a new search term, set count to 1
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Firebase Error:", error);
  }
};
