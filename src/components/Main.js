import React from "react";
import { Col, Row } from "antd";
import ObserverInfo from "./ObserverInfo";

const Main = () => {
  return (
    <Row>
      <Col span={8}>
        <ObserverInfo/>
      </Col>
      <Col span={16}>
        WorldMap
      </Col>
    </Row>
  )
}

export default Main;
