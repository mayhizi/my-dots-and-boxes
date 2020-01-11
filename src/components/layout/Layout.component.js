import React from "react";
import { Layout, Row, Col, Typography } from "antd";
const { Header, Footer, Content } = Layout;
const { Text, Title } = Typography;

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <Row>
          <Col lg={{ span: 8, offset: 8 }} xs={{ span: 24 }}>
            {/* <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: "64px", backgroundColor: "white" }}
              > */}
            <Title style={{ textAlign: "center", color: "black" }} level={3}>
              Dots and Boxes
            </Title>
            {/* </Menu> */}
          </Col>
        </Row>
      </Header>
      <Content>{children}</Content>
      {/* <Footer style={{ background: "white" }}>Footer</Footer> */}
    </Layout>
  );
}
