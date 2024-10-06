import "./App.css";

import { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Flex,
  Tooltip,
  Badge,
  Divider,
} from "antd";
import {
  Bell,
  BellRing,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  Settings,
  Store,
  User,
  Users,
} from "lucide-react";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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
        <Sider collapsed={collapsed} className="sidebar">
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
            <Menu.ItemGroup title="Main">
              <Menu.Item icon={<Users size={16} />} key="1">
                All Clients
              </Menu.Item>

              <Menu.Item icon={<Store size={16} />} key="2">
                My Branches
              </Menu.Item>
              <Menu.Item icon={<Package size={16} />} key="3">
                Products
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="System">
              <Menu.SubMenu
                key="sub1"
                icon={<Settings size={16} />}
                title="Settings"
              >
                <Menu.Item key="4">Profile</Menu.Item>
                <Menu.Item key="5">Option 2</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item
                icon={
                  <Badge dot>
                    <BellRing size={16} />
                  </Badge>
                }
                key="6"
              >
                Notifications
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
          <div className="admin-card">
            <Avatar
              src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix"
              className="admin-card-avatar"
              icon={<User size={15} />}
              style={{ minWidth: 30 }}
            />
            <div className="admin-card-details">
              <div className="admin-card-name">yahia bourouni</div>
              <div className="admin-card-email">ybourouni@yahoo.com</div>
            </div>
            <ChevronRight className="admin-card-icon" size={16} color="white" />
          </div>
          <Tooltip title={collapsed ? "Log Out" : ""} placement="right">
            <Button type="primary" danger className="logout-button">
              <LogOut size={15} />
              <span>Log Out</span>
            </Button>
          </Tooltip>
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
