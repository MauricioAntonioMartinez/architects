import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { adminRoutes } from "../routes/admin.routes";
const { Sider, Content, Footer } = Layout;
const { Item } = Menu;
//const { SubMenu } = Menu;

const Dashboard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed((prev) => !prev)}
      >
        <Menu
          style={{
            marginTop: "8rem",
          }}
          theme="dark"
          mode="inline"
          defaultActiveFirst
        >
          {adminRoutes.map((route, key) => {
            return (
              <Item key={key} icon={<route.icon />}>
                <Link to={route.path}>{route.title}</Link>
              </Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ padding: "16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          ©2020 Created by
          <a href="https://github.com/MauricioAntonioMartinez">
            Mauricio Martinez
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
