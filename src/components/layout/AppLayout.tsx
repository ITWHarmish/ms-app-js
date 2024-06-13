import "./AppLayout.scss";

import { Layout, theme } from "antd";
import { useState } from "react";

import { useAuthValue } from "../../context/AuthContext";
import AppHeader from "./AppHeader";
import AppNavigation from "./AppNavigation";

const { Content, Footer, Header, Sider } = Layout;

const AppLayout = (props: { children: any }) => {
  const { currentUser } = useAuthValue();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => setCollapsed(!collapsed);

  return (
    <>
      <Layout className="app-layout">
        {/* <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <img src="/logo.png" alt="Toshal Infotech" className={collapsed ? "logo collapsed" : "logo"} />
          <AppNavigation />
        </Sider> */}
        <Layout className="site-layout">
          <Header
            style={{
              backgroundColor: "white",
              position: "sticky",
              top: 0,
              zIndex: 9,
              width: "100%",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            {currentUser && <AppHeader />}
          </Header>
          <Content className="app-content" style={{ backgroundColor: colorBgContainer }}>
            <div className="app-content-wrapper">{props.children}</div>
          </Content>
          <Footer className="app-footer">Toshal Management System ©2022 Created by Toshal Infotech</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
