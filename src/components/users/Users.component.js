import React from "react";

export default function UsersComponent({ users }) {
  console.log("users:", users);
  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
