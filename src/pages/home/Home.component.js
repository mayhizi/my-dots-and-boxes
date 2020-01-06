import React from "react";
import Users from "../../components/users";
import CreateGame from "../../components/create-game";
import Games from "../../components/games";
import { Button } from "antd";
export default function HomeComponent() {
  return (
    <div>
      I'm the home component
      <Button type="primary">Primary</Button>
      <Button type="danger">Danger</Button>
      <Users></Users>
      <CreateGame></CreateGame>
      <Games></Games>
    </div>
  );
}
