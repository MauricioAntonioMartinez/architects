import React from "react";
import { Layout, Typography } from "antd";
//import { Link } from "react-router-dom";
const { Header, Content } = Layout;
//const { Item } = Menu;

const { Title } = Typography;

const HomeLayOut: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <Title style={{ color: "#ccc" }}>Architect's Page</Title>
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Item key="1">
              <Link to="/login">Log In</Link>
            </Item>
            <Item key="2">
              <Link to="signup"> Sign Up</Link>
            </Item>
            <Item key="3">Home</Item>
          </Menu> */}
        </Header>
        <Content style={{ padding: "2rem", width: "500px", margin: "auto" }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default HomeLayOut;
