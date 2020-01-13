import React, { useContext } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";
import { useCookies } from "react-cookie";

export default function withSignInContainer(SignInComponent) {
  return ({ children }) => {
    const db = useContext(FireStoreContext);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const createUser = (username) => {
      db.collection("users")
        .add({
          username
        })
        .then((next) => {
          setCookie("user", {
            username: username,
            id: next.id
          });
        });
    };

    const removeUser = () => {
      db.collection("users")
        .doc(cookies.user.id)
        .delete();
      removeCookie("user");
    };
    return (
      <>
        <SignInComponent
          removeUser={removeUser}
          createUser={createUser}
          cookie={{
            userCookie: cookies,
            setUserCookie: setCookie,
            removeUserCookie: removeCookie
          }}
        ></SignInComponent>
        {cookies.user ? children : "welcome"}
      </>
    );
  };
}
