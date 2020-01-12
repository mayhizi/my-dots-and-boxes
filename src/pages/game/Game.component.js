import React, { useState, useEffect, useRef, useContext } from "react";
import "./Game.style.css";
import { FireStoreContext } from "../../providers/FireStoreProvider";

const DrawLine = ({ user, x1, y1, x2, y2, lineKey, gameId, history }) => {
  const [color, setColor] = useState("silver");
  const [player, setPlayer] = useState(null);
  const db = useContext(FireStoreContext);

  const setHistory = (data) => {
    db.collection("games")
      .doc(gameId)
      .get()
      .then((snapshot) => {
        const history = snapshot.get("history");

        history.push(data);

        db.collection("games")
          .doc(gameId)
          .update({ history });
      });
  };
  const checkHistory = (key) => {
    return history && history.find((next) => next.lineKey === key);
  };
  const checkTurn = () => {
    console.log("turn", user.turn);
    if (history) {
      if (history.length === user.turn) return true;
      if (history.length % user.number === user.turn) return true;
    } else return user.turn === 0;
    return false;
  };
  // useEffect(() => {

  // }, [user.turn]);
  useEffect(() => {
    const changed = checkHistory(lineKey);
    if (changed) {
      setColor(changed.color);
      setPlayer(changed.user);
    }
  }, [history]);
  if (x1 && x2 && y1 && y2)
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{ stroke: color, strokeWidth: "7" }}
        onMouseOver={() => !player && setColor("yellow")}
        onMouseLeave={() => !player && setColor("silver")}
        onClick={() => {
          if (checkTurn()) {
            setColor(user.color);
            setPlayer(user);
            setHistory({ user, color: user.color, lineKey });
          }
        }}
      />
    );
  return null;
};
const GameBoard = ({
  margin,
  width,
  height,
  offset,
  user,
  gameId,
  history
}) => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState({});

  useEffect(() => {
    let next = [];
    const distanceX = (width - 2 * margin) / (offset - 1);
    const distanceY = (height - 2 * margin) / (offset - 1);
    for (let i = 0; i < offset; i++) {
      for (let j = 0; j < offset; j++) {
        next.push({ x: margin + j * distanceX, y: margin + i * distanceY });
      }
    }
    setPoints(next);
  }, [margin, width, height, offset]);
  useEffect(() => {
    const next = new Array(...points);
    const lines = next.reduce(
      (lines, point) => {
        if (!lines.horizontal[point.y]) lines.horizontal[point.y] = [];
        lines.horizontal[point.y].push(point.x);
        if (!lines.vertical[point.x]) lines.vertical[point.x] = [];
        lines.vertical[point.x].push(point.y);

        return lines;
      },
      { horizontal: {}, vertical: {} }
    );
    setLines(lines);
  }, [points]);

  const getHorizontalLines = () => {
    let horizontal = [];
    if (lines.horizontal) {
      Object.keys(lines.horizontal).forEach((key) => {
        const line = lines.horizontal[key];
        const next = line.map((value, index) => {
          return (
            index + 1 < line.length && (
              <DrawLine
                x1={value}
                y1={key}
                x2={line[index + 1]}
                y2={key}
                user={user}
                key={`h-${index}-${key}`}
                lineKey={`h-${index}-${key}`}
                gameId={gameId}
                history={history}
              ></DrawLine>
            )
          );
        });
        horizontal = [...horizontal, ...next];
      });
    }
    return horizontal;
  };

  const getVerticalLines = () => {
    let vertical = [];
    if (lines.vertical) {
      Object.keys(lines.vertical).forEach((key) => {
        const line = lines.vertical[key];
        const next = line.map(
          (value, index) =>
            index + 1 < line.length && (
              <DrawLine
                x1={key}
                y1={value}
                x2={key}
                y2={line[index + 1]}
                user={user}
                key={`v-${index}-${key}`}
                lineKey={`v-${index}-${key}`}
                gameId={gameId}
                history={history}
              />
            )
        );
        vertical = [...vertical, ...next];
      });
    }
    return vertical;
  };
  return (
    <>
      {points &&
        points.map(
          (point, index) =>
            point.x && (
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                stroke="black"
                strokeWidth="3"
                fill="black"
                key={index}
              />
            )
        )}
      {getHorizontalLines()}
      {getVerticalLines()}
    </>
  );
};

export default function GameComponent({ game, color, user }) {
  const gameContainerRef = useRef(null);
  const [dimention, setDimention] = useState({});
  const [turn, setTurn] = useState(-1);
  useEffect(() => {
    if (game.players) {
      const myTurn = game.players.indexOf(
        game.players.find((player) => player.id === user.id)
      );
      setTurn(myTurn);
      console.log("MY TURN", myTurn);
    }
  }, [game.players]);
  useEffect(() => {
    if (gameContainerRef.current) {
      setDimention({
        width: gameContainerRef.current.clientWidth,
        height: gameContainerRef.current.clientHeight
      });
    }
  }, [gameContainerRef]);

  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        // background: "silver",
        margin: "0 auto"
      }}
    >
      {dimention && (
        <svg ref={gameContainerRef} className="game-container">
          <GameBoard
            offset={5}
            width={dimention.width}
            height={dimention.height}
            margin={40}
            user={{
              ...user,
              color: color,
              turn: turn,
              number: game.number
            }}
            gameId={game.id}
            history={game.history}
          />
        </svg>
      )}
    </div>
  );
}
