import React from "react";
import { Link } from "react-router-dom";
export default function GamesComponent({ games }) {
  return (
    <div>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={`/game/${game.id}`}>{game.number}</Link>
            <button>Join game</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
