import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";

export default function withGameContainer(GameComponent) {
  return ({ match }) => {
    const db = useContext(FireStoreContext);
    const [game, setGame] = useState([]);
    const [color, setColor] = useState("");
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
      game.players &&
        game.players.forEach((player, index) => {
          player.get().then((snapshot) => {
            if (snapshot.id === cookies.user.id) setColor(colors[index]);
          });
        });
    };
    useEffect(() => {
      getColor();
    }, [game.players]);
    useEffect(() => {
      if (db) finGameById();
    }, [db]);
    return <GameComponent game={game} color={color}></GameComponent>;
  };
}
