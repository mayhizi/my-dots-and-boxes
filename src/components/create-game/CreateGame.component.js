import React, { useRef } from "react";

export default function CreateGameComponent({ createGame }) {
  const numberRef = useRef(null);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createGame(parseInt(numberRef.current.value));
        }}
        style={{ maxWidth: "300px", margin: "0 auto", padding: "70px" }}
      >
        <input
          type="number"
          name="number"
          ref={numberRef}
          min="2"
          max="4"
          defaultValue="2"
        ></input>
        <button type="submit">Create a game</button>
      </form>
    </div>
  );
}
