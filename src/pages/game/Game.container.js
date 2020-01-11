import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";

export default function withGameContainer(GameComponent) {
  return ({ match }) => {
    const db = useContext(FireStoreContext);
    const [game, setGame] = useState([]);
    const [players, setPlayers] = useState([]);
    const [cookies] = useCookies(["user"]);

    const finGameById = () => {
      db.collection("games")
        .doc(match.params.id)
        .onSnapshot((next) => {
          console.log("snapshot::", next.data());
          setGame({
            id: next.id,
            ...next.data()
          });
        });
    };
    // const finPlayersByGame = () => {
    //   db.collection("games")
    //     .doc(match.params.id)
    //     .onSnapshot((next) => {
    //       console.log("snapshot::", next);
    //       setPlayers({
    //         id: next.id,
    //         ...next.data()
    //       });
    //     });
    // };
    const colors = ["blue", "green", "orange", "purple"];
    const getColor = () => {
      console.log("Player from Game DB", game.players);
      game.players.forEach((player, index) => {
        if (player.id === cookies.user.id) return colors[index];
      });
    };
    useEffect(() => {
      if (db) finGameById();
    }, [db]);
    return <GameComponent game={game} color={getColor}></GameComponent>;
  };
}
