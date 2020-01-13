import React, { Component } from "react";
import { Row, Col, List, Typography, Icon } from "antd";

const howToPlay = [
  "1. Choose how many players will be in the game and whether they are human or computer players",
  "2. Each turn, drag between two horizontally or vertically adjacent dots to draw a line",
  "3. Drawing the 4th wall of a box wins it, earning you a point. When you close a box you must move again.",
  "4. Lines are drawn until all squares are claimed. The player with the most claimed squares wins!",
  "5. Be careful not to create long chains of boxes for your opponents to claim",
  "6. Think of creative ways to double cross your opponent, forcing them to give you the long chains!"
];

const FEATURES = [
  "* Up to 4 player Dots and Boxes",
  "* 4 computer difficulties to challenge",
  "* Different board sizes to choose from",
  "* A number of fun game board themes",
  "* Automatic game saves so you can come back anytime    ",
  "* Beautiful graphics and animations    ",
  "* Simple, pleasing sound effects  ",
  "* Easy to use interface  "
];
class Dotsandboxes extends Component {
  render() {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid white",
          borderRadius: "25px",
          margin: "40px",
          background: "white"
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <List
              header={
                <Typography.Text strong>
                  HOW TO PLAY <Icon type="question" />
                </Typography.Text>
              }
              //   footer={<div>Footer</div>}
              //   bordered
              dataSource={howToPlay}
              renderItem={(item) => (
                <List.Item>
                  {item}
                  {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}></Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <List
              header={<Typography.Text strong>FEATURES</Typography.Text>}
              //   footer={<div>Footer</div>}
              //   bordered
              dataSource={FEATURES}
              renderItem={(item) => (
                <List.Item>
                  {item}

                  {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Dotsandboxes;
