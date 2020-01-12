import React from "react";

export default function withPlayersContainer(PlayersComponent) {
  return (props) => {
    return <PlayersComponent {...props}></PlayersComponent>;
  };
}
