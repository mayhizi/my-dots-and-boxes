import React, { useContext, useState, useEffect } from "react";
import { FireStoreContext } from "../../providers/FireStoreProvider";

export default function withUsersContainer(UsersComponent) {
  return (props) => {
    const db = useContext(FireStoreContext);
    const [users, setUsers] = useState([]);
    const findAllUsers = () => {
      db.collection("users").onSnapshot((next) => {
        console.log("snapshot::", next);
        setUsers(
          next.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          })
        );
      });
      // .get()
      // .then((next) => {
      //   console.log(next);
      //   setUsers(
      //     next.docs.map((doc) => {
      //       return {
      //         id: doc.id,
      //         ...doc.data()
      //       };
      //     })
      //   );
      // });
    };
    useEffect(() => {
      if (db) findAllUsers();
    }, [db]);

    return (
      <div>
        <UsersComponent users={users}></UsersComponent>
      </div>
    );
  };
}
