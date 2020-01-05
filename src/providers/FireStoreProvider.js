import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export const FireStoreContext = React.createContext();

const FireStoreProvider = ({ children }) => {
  const [db, setDB] = useState();
  useEffect(() => {
    const firestore = firebase.firestore();
    firestore.settings({
      timestampsInSnapshots: true
    });
    setDB(firestore);
  }, []);
  return (
    <FireStoreContext.Provider value={db}>{children}</FireStoreContext.Provider>
  );
};

export default FireStoreProvider;
