import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";

export default function withGamesContainer(GamesComponent) {
  return () => {
    const db = useContext(FireStoreContext);
    const [games, setGames] = useState([]);

    const findAllGames = () => {
      db.collection("games").onSnapshot((next) => {
        console.log("snapshot::", next);
        setGames(
          next.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          })
        );
      });
    };
    useEffect(() => {
      if (db) findAllGames();
    }, [db]);
    return <GamesComponent games={games}></GamesComponent>;
  };
}
