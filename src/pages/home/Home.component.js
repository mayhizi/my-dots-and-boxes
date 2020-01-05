import React from "react";
import Users from "../../components/users";
import CreateGame from "../../components/create-game";
import Games from "../../components/games";
export default function HomeComponent() {
  return (
    <div>
      I'm the home component
      <Users></Users>
      <CreateGame></CreateGame>
      <Games></Games>
    </div>
  );
}
