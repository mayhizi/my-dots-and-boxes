import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";

export default function withGameContainer(GameComponent) {
  return ({ match }) => {
    const db = useContext(FireStoreContext);
    const [game, setGame] = useState([]);
    const finGameById = () => {
      db.collection("games")
        .doc(match.params.id)
        .onSnapshot((next) => {
          console.log("snapshot::", next);
          setGame({
            id: next.id,
            ...next.data()
          });
        });
    };
    useEffect(() => {
      if (db) finGameById();
    }, [db]);
    return <GameComponent game={game}></GameComponent>;
  };
}
