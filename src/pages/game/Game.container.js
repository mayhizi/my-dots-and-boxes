import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";

export default function withGameContainer(GameComponent) {
  return ({ match }) => {
    const db = useContext(FireStoreContext);
    const [game, setGame] = useState([]);
    const [color, setColor] = useState("");
    const [players, setPlayers] = useState([]);

    const [cookies] = useCookies(["user"]);

    const finGameById = () => {
      db.collection("games")
        .doc(match.params.id)
        .onSnapshot((next) => {
          setGame({
            id: next.id,
            ...next.data()
          });
        });
    };

    const colors = ["blue", "green", "orange", "purple"];
    const getColor = () => {
      game.players &&
        game.players.forEach((player, index) => {
          player.get().then((snapshot) => {
            if (snapshot.id === cookies.user.id) setColor(colors[index]);
          });
        });
    };
    const playersColor = () => {
      game.players &&
        setPlayers(
          game.players.map((player, index) => {
            return {
              player: player,
              playerNumber: `${index + 1}`,
              color: colors[index]
            };
          })
        );
    };
    useEffect(() => {
      getColor();
      playersColor();
    }, [game.players]);
    useEffect(() => {
      if (db) finGameById();
    }, [db]);
    return (
      <GameComponent
        game={game}
        color={color}
        user={cookies.user}
        players={players}
      ></GameComponent>
    );
  };
}
