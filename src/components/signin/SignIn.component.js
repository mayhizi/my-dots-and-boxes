import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Typography, Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";
const { Text } = Typography;

export default function SignInComponent({ cookie, createUser, removeUser }) {
  const { userCookie } = cookie;
  const [username, setUsername] = useState("");

  return (
    <div style={{ margin: "0 auto" }}>
      {userCookie.user ? (
        <Row>
          <Col span={12}>
            <Text mark>Hello {userCookie.user.username}</Text>
          </Col>
          <Col offset={8} span={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                removeUser();
              }}
            >
              <button type="submit">SignOut</button>
            </form>
          </Col>

          <Link to={`/creategame`}>Click Here To create a game</Link>
        </Row>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            createUser(username);
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
