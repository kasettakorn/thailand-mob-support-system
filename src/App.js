import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  HeartFilled,
  HomeFilled,
  InfoCircleFilled,
  PlusSquareFilled,
} from "@ant-design/icons";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Support from "./components/Support";
import Location from "./components/Location";
import Home from "./components/Home";
import Cheerup from "./components/Cheerup";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeFilled />}>
                <Link
                  to="/thailand-mob-support-system/"
                  style={{ textDecoration: "none" }}
                >
                  หน้าหลัก
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PlusSquareFilled />}>
                <Link
                  to="/thailand-mob-support-system/support"
                  style={{ textDecoration: "none" }}
                >
                  ขอความช่วยเหลือ
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<InfoCircleFilled />}>
                <Link
                  to="/thailand-mob-support-system/searchLocation"
                  style={{ textDecoration: "none" }}
                >
                  ค้นหาพิกัด
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={
                  <HeartFilled style={{ color: "red", fontSize: "1.5em" }} />
                }
              >
                <Link
                  to="/thailand-mob-support-system/cheerup"
                  style={{ textDecoration: "none" }}
                >
                  Cheer up !
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0, color: "white", fontSize: 18 }}
            >
              <span role="img" >📌 ระบบสอบถามข้อมูลแก่ผู้ชุมนุม</span>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, height:"100vh" }}
              >
                <Route path="/thailand-mob-support-system/" component={Home} />
                <Route
                  path="/thailand-mob-support-system/support"
                  component={Support}
                />
                <Route
                  path="/thailand-mob-support-system/searchLocation"
                  component={Location}
                />
                <Route
                  path="/thailand-mob-support-system/cheerup"
                  component={Cheerup}
                />
              </div>
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                {" "}
                www.flaticon.com
              </a>
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
