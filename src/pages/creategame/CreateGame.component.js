import React from "react";
import CreateGameComponent from "../../components/create-game";
import Games from "../../components/games";
import Informations from "../../components/dots-informations";
export default function CreateGame() {
  return (
    <div>
      <CreateGameComponent></CreateGameComponent>
      <Games></Games>
      <Informations></Informations>
    </div>
  );
}
