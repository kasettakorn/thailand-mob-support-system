import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  InfoCircleFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Support from "./components/Support";
import Location from "./components/Location";
import Home from "./components/Home";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude);
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeFilled />}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  หน้าหลัก
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PlusSquareFilled />}>
                <Link to="/support" style={{ textDecoration: "none" }}>
                  ขอความช่วยเหลือ
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<InfoCircleFilled />}>
                <Link to="/searchLocation" style={{ textDecoration: "none" }}>
                  ค้นหาพิกัด
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0, color: "white", fontSize: 18 }}
            >
              📌 ระบบสอบถามข้อมูลแก่ผู้ชุมนุมประชาธิปไตย
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 600 }}
              >
                <Route exact path="/" component={Home} />
                <Route path="/support" component={Support} />
                <Route path="/searchLocation" component={Location} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
              ©{new Date().getFullYear()} Created by Ronnakorn Hompoa
              <br />
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
