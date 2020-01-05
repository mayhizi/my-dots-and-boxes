import React, { useRef } from "react";

export default function SignInComponent({ cookie, createUser, removeUser }) {
  const { userCookie, setUserCookie, removeUserCookie } = cookie;
  console.log(userCookie);
  const usernameRef = useRef(null);
  return (
    <div>
      {userCookie.user ? (
        <div>
          Hello {userCookie.user.username}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              removeUser();
            }}
          >
            <button type="submit">SignOut</button>
          </form>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUser(usernameRef.current.value);
            usernameRef.current.value = "";
          }}
        >
          <input type="text" ref={usernameRef}></input>
          <button type="submit">Start the game</button>
        </form>
      )}
    </div>
  );
}
