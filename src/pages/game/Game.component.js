import React, { useState, useEffect, useRef } from "react";
import "./Game.style.css";

const DrawLine = ({ user, x1, y1, x2, y2 }) => {
  const [color, setColor] = useState("silver");
  const [player, setPlayer] = useState(null);
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
        setColor(user.color);
        setPlayer(user);
      }}
    />
  );
};
const GameBoard = ({ margin, width, height, offset, user }) => {
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
        const next = line.map(
          (value, index) =>
            index + 1 < line.length && (
              <DrawLine
                x1={value}
                y1={key}
                x2={line[index + 1]}
                y2={key}
                user={user}
              ></DrawLine>
            )
        );
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
      {points.map((point, index) => (
        <circle
          cx={point.x}
          cy={point.y}
          r="4"
          stroke="black"
          strokeWidth="3"
          fill="black"
          key={index}
        />
      ))}
      {getHorizontalLines()}
      {getVerticalLines()}
    </>
  );
};

export default function GameComponent({ game, color }) {
  const gameContainerRef = useRef(null);
  const [dimention, setDimention] = useState({});
  useEffect(() => {
    if (gameContainerRef.current) {
      console.log(gameContainerRef.current.clientWidth);
      setDimention({
        width: gameContainerRef.current.clientWidth,
        height: gameContainerRef.current.clientHeight
      });
    }
  }, [gameContainerRef]);
  useEffect(() => {
    console.log(color);
  }, [color]);
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
            user={{ color: color }}
          />
        </svg>
      )}
    </div>
  );
}
