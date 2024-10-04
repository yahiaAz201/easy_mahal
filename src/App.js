import "./App.css";

import { useState } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  PointerOffIcon,
  Settings,
  SquareMenu,
  Store,
  TouchpadOff,
  User,
  Users,
} from "lucide-react";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App">
      <Layout>
        <Sider collapsed={collapsed} style={{ background: "#fff" }}>
          <button className={`sidebar-toggler`} onClick={toggleCollapsed}>
            {collapsed ? (
              <ChevronRight color="rgba(0,0,0,.77)" size={16} />
            ) : (
              <ChevronLeft color="rgba(0,0,0,.77)" size={16} />
            )}
          </button>
          <header className="sidebar-header">
            <img
              className="sidebar-header-logo"
              src="./logo192.png"
              alt="logo"
            />
            <span className="sidebar-header-title">Easy Mahal</span>
          </header>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={[current]}
            className="sidebar-menu"
          >
            <Menu.Item icon={<Users size={16} />} key="1">
              All Clients
            </Menu.Item>
            <Menu.SubMenu
              key="sub1"
              icon={<Settings size={16} />}
              title="Settings"
            >
              <Menu.Item key="2">Profile</Menu.Item>
              <Menu.Item key="3">Option 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<Store size={16} />} key="4">
              My Branches
            </Menu.Item>
            <div className="admin-card">
              <Avatar
                src="https://api.dicebear.com/9.x/thumbs/svg?seed=yahia"
                className="admin-card-avatar"
                icon={<User size={18} />}
              />
              <div className="admin-card-details">
                <div className="admin-card-name">yahia bourouni</div>
                <div className="admin-card-email">ybourouni@yahoo.com</div>
              </div>
            </div>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <HomePage />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
