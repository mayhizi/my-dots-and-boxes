import React from "react";
import { Layout, Row, Col, Typography } from "antd";
const { Header, Content } = Layout;
const { Title } = Typography;

export default function LayoutComponent({ children }) {
  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <Row>
          <Col lg={{ span: 8, offset: 8 }} xs={{ span: 24 }}>
            <Title
              style={{ textAlign: "center", color: "black", padding: "10px" }}
              level={4}
            >
              Dots and Boxes
            </Title>
          </Col>
        </Row>
      </Header>
      <Content style={{ background: "white" }}>{children}</Content>
    </Layout>
  );
}
