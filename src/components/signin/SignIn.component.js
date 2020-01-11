import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";

export default function SignInComponent({ cookie, createUser, removeUser }) {
  const { userCookie, setUserCookie, removeUserCookie } = cookie;
  // console.log(userCookie);
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");

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
            <Link to={`/creategame`}>Click Here To start playing now !!!</Link>
          </form>
        </div>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            // createUser(usernameRef.current.value);
            createUser(username);
            // setUsername(event.target.value) = "";
          }}
          style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}
        >
          <Form.Item
            hasFeedback
            validateStatus="error"
            help="Your username is required"
          >
            <Input
              required
              onChange={(event) => setUsername(event.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Play Now!
            </Button>
          </FormItem>
        </Form>
      )}
    </div>
  );
}
{
  /* <form
          onSubmit={(e) => {
            e.preventDefault();
            createUser(usernameRef.current.value);
            usernameRef.current.value = "";
          }}
        >
          <input type="text" ref={usernameRef}></input>
          <button type="submit">Start the game</button>
        </form> */
}
