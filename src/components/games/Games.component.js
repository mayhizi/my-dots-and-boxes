import React from "react";
import { Link } from "react-router-dom";
import { CLIENT_RENEG_LIMIT } from "tls";
export default function GamesComponent({ games, JoinGame }) {
  return (
    <div>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={`/game/${game.id}`}>{game.number}</Link>
            {/* {game.players.length()} */}
            {game.players.length < game.number ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  JoinGame(game.id);
                }}
              >
                Join game
              </button>
            ) : (
              "Game is Full"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
