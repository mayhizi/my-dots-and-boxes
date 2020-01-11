import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";
import firebase from "firebase";
export default function withGamesContainer(GamesComponent) {
  return () => {
    const db = useContext(FireStoreContext);
    const [games, setGames] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const findAllGames = () => {
      db.collection("games").onSnapshot((next) => {
        // console.log("snapshot::", next);
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

    const JoinGame = (id) => {
      db.collection("games")
        .doc(id)
        .get()
        .then((snapshot) => {
          const players = snapshot.get("players");
          players.push(db.doc(`/users/${cookies.user.id}`));
          db.collection("games")
            .doc(id)
            .update({ players });
        });
    };

    useEffect(() => {
      if (db) findAllGames();
    }, [db]);
    return <GamesComponent games={games} JoinGame={JoinGame}></GamesComponent>;
  };
}
