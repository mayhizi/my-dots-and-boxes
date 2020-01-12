import React, { useState, useEffect } from "react";

export default function PlayersComponent({ players, scores }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      return await players.map(async (player) => {
        const next = await player.player.get();
        return { ...next.data(), ...player };
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (players) {
      getUsers().then(async (data) => {
        console.log("KKK", data);
        Promise.all(data).then((res) => setUsers(res));
      });
    }
  }, [players]);
  useEffect(() => {
    console.log("SSS", scores);
  }, [scores]);
  return (
    <div>
      {users &&
        users.map((user, index) => {
          return (
            <div key={index}>
              {user.playerNumber} =
              <div
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: user.color
                }}
              />{" "}
              {user.username} score {}
            </div>
          );
        })}
    </div>
  );
}
