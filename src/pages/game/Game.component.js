import React, { useState, useEffect, useRef, useContext } from "react";
import "./Game.style.css";
import { Typography } from "antd";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import Players from "../../components/display-game-players";
const { Text } = Typography;

const DrawSquare = ({ squares, history, setScore }) => {
  const [activeSquares, setActiveSquares] = useState([]);
  const updateSquares = () => {
    if (history) {
      const last = history[history.length - 1];
      if (last) {
        const founds = activeSquares.filter(
          (square) =>
            (square.points[0].x === last.x1 &&
              square.points[0].y === last.y1 &&
              square.points[1].x === last.x2 &&
              square.points[1].y === last.y2) ||
            (square.points[0].x === last.x1 &&
              square.points[0].y === last.y1 &&
              square.points[2].x === last.x2 &&
              square.points[2].y === last.y2) ||
            (square.points[1].x === last.x1 &&
              square.points[1].y === last.y1 &&
              square.points[3].x === last.x2 &&
              square.points[3].y === last.y2) ||
            (square.points[2].x === last.x1 &&
              square.points[2].y === last.y1 &&
              square.points[3].x === last.x2 &&
              square.points[3].y === last.y2)
        );
        if (founds) {
          founds.forEach((found) => {
            const points = found.points;
            const foundPoints = points.filter((point) => {
              return (
                (point.x === last.x1 && point.y === last.y1) ||
                (point.x === last.x2 && point.y === last.y2) ||
                (point.x === last.x1 && point.y === last.y2) ||
                (point.x === last.x2 && point.y === last.y1)
              );
            });
            foundPoints.forEach((foundPoint) => {
              const indexPoint = points.indexOf(foundPoint);
              found.status[indexPoint]++;
              const activate = found.status
                .map((state) => state >= 2)
                .every((x) => x === true);
              if (activate) {
                found.active = activate;
                found.user = last.user;
              }
            });
          });

          setActiveSquares([...activeSquares]);
        }
      }
    }
  };
  const updateScore = () => {
    const scores = activeSquares
      .filter((square) => square.active)
      .reduce((next, square) => {
        if (square.user) {
          if (!next[square.user.color]) next[square.user.color] = 0;
          next[square.user.color]++;
        }
        return next;
      }, []);
    setScore(scores);
  };
  useEffect(() => {
    updateScore();
  }, [activeSquares]);
  useEffect(() => {
    updateSquares();
  }, [history]);
  useEffect(() => {
    squares && setActiveSquares(squares);
  }, [squares]);
  return activeSquares.map(
    (square, index) =>
      square.active && (
        <path
          fillOpacity="0.6"
          fill={square.user.color}
          key={index}
          d={`M${square.points[0].x} ${square.points[0].y} L${square.points[1].x} ${square.points[1].y} L${square.points[3].x} ${square.points[3].y} L${square.points[2].x} ${square.points[2].y} Z`}
        ></path>
      )
  );
};

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

        history.push({
          ...data,
          x1: parseFloat(x1),
          y1: parseFloat(y1),
          x2: parseFloat(x2),
          y2: parseFloat(y2)
        });

        db.collection("games")
          .doc(gameId)
          .update({ history });
      });
  };
  const checkHistory = (key) => {
    return history && history.find((next) => next.lineKey === key);
  };
  const checkTurn = () => {
    if (history) {
      if (history.length === user.turn) return true;
      if (history.length % user.number === user.turn) return true;
    } else return user.turn === 0;
    return false;
  };

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
  history,
  setScore
}) => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState({});
  const [squares, setSquares] = useState([]);
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

  const chunk = (array, size) => {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  };
  const getSquares = () => {
    const chunked = chunk(points, offset);
    let i = 0,
      j = 0,
      rects = [];
    while (i + 1 < chunked.length) {
      const lineA = chunked[i];
      const lineB = chunked[i + 1];
      while (j + 1 < lineA.length) {
        rects.push({
          user: null,
          active: false,
          status: [0, 0, 0, 0],
          points: [lineA[j], lineA[j + 1], lineB[j], lineB[j + 1]]
        });
        j++;
      }
      j = 0;
      i++;
    }
    return rects;
  };
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
    setSquares(getSquares());
  }, [points]);
  useEffect(() => {}, [squares]);
  return (
    <>
      <DrawSquare
        squares={squares}
        history={history}
        setScore={setScore}
      ></DrawSquare>
      {getHorizontalLines()}
      {getVerticalLines()}
      {points &&
        points.map(
          (point, index) =>
            point.x && (
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                stroke="pink"
                strokeWidth="6"
                fill="pink"
                key={index}
              />
            )
        )}
    </>
  );
};

export default function GameComponent({ game, color, user, players }) {
  const gameContainerRef = useRef(null);
  const [dimention, setDimention] = useState({});
  const [turn, setTurn] = useState(-1);
  const [score, setScore] = useState([]);
  useEffect(() => {
    if (game.players) {
      const myTurn = game.players.indexOf(
        game.players.find((player) => player.id === user.id)
      );
      setTurn(myTurn);
    }
  }, [game.players]);
  useEffect(() => {}, [players]);
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
        margin: "0 auto"
      }}
    >
      <Players players={players} scores={score}></Players>
      <Text mark>
        Turn of {game.history && (game.history.length % game.number) + 1}
      </Text>

      {score.map((score) => {
        console.log(score);
      })}

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
            setScore={setScore}
          />
        </svg>
      )}
    </div>
  );
}
