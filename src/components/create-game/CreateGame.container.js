import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";

export default function withCreateGameContainer(CreateGameComponent) {
  return () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const createGame = (number) => {
      const user = db.collection("games").add({
        user: db.doc(`/users/${cookies.user.id}`),
        active: false,
        players: [],
        history: [],
        number: number
      });
      //   .then((next) => {
      //     setCookie("user", {
      //       username: username,
      //       id: next.id
      //     });
      //     console.log(next);
      //   });
    };
    const db = useContext(FireStoreContext);
    return <CreateGameComponent createGame={createGame}></CreateGameComponent>;
  };
}
