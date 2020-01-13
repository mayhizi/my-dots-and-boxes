import React from "react";

export default function UsersComponent({ users }) {
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
