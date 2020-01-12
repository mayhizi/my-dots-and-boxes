import React from "react";
import { Link } from "react-router-dom";
import { CLIENT_RENEG_LIMIT } from "tls";
export default function GamesComponent({ games, JoinGame, user }) {
  const getButton = (game) => {
    if (game.players.length < game.number) {
      const next = game.players.reduce((exist, player) => {
        if (player.id === user.id) return true;
      }, false);
      if (next) return "you are  joined";
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            JoinGame(game.id);
          }}
        >
          Join game
        </button>
      );
    }
    return "Game is full";
  };

  return (
    <div>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={`/game/${game.id}`}>{game.number}</Link>
            {/* {game.players.length()} */}
            {getButton(game)}
          </li>
        ))}
      </ul>
    </div>
  );
}
