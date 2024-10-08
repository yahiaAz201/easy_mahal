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
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Fingerprint,
  LogOut,
  Package,
  Settings,
  Store,
  User,
  User2,
  Users,
} from "lucide-react";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";

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
            className="sidebar-menu"
          >
            <Menu.ItemGroup title="Main">
              <Menu.Item icon={<Users size={16} />} key="1">
                All Clients
              </Menu.Item>

              <Menu.Item icon={<Store size={16} />} key="2">
                Branches
              </Menu.Item>
              <Menu.Item icon={<ChartNoAxesCombined size={16} />} key="4">
                Analytics
              </Menu.Item>
              <Menu.Item icon={<Package size={16} />} key="3" disabled>
                Products
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="System">
              {/*   <Menu.SubMenu
                key="sub1"
                icon={<Settings size={16} />}
                title="Settings"
              >
                <Menu.Item icon={<CircleUser size={16} />} key="5">
                  Account
                </Menu.Item>
                <Menu.Item icon={<Fingerprint size={16} />} key="security">
                  Security
                </Menu.Item>
              </Menu.SubMenu> */}
              <Menu.Item icon={<Settings size={16} />} key="8">
                Settings
              </Menu.Item>
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
              <span>Log Out</span>
              <LogOut size={15} />
            </Button>
          </Tooltip>
        </Sider>
        <Layout>
          <Content>
            <AccountPage />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
