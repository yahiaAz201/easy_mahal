import "./App.css";

import { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Tooltip,
  Badge,
  Modal,
  Flex,
  Divider,
} from "antd";
import {
  BellRing,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  Route,
  Settings,
  Store,
  User,
  Users,
} from "lucide-react";

import NavBar from "./components/NavBar";
import Loading from "./components/Loading";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/Settings";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import BranchesPage from "./pages/BranchesPage";

const { Sider, Content } = Layout;

const USER = {
  _id: "507f1f77bcf86cd799439011",
  fname: "yahia",
  lname: "bourouni",
  email: "ybourouni@yahoo.com",
  phone: "0783773369",
  nombre: 12,
  ccp: {
    number: "0024279644",
    key: "29",
  },
  state: 43,
  city: 1,
  isAdmin: true,
};

function App() {
  const [user, setUser] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onShowNotifications = () => {
    setShowNotifications(true);
  };

  useEffect(() => {
    setLoading(true);
    setUser(null);
    setUser(USER);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="App">
        {user ? (
          <AccountPage  />
        ) : (
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
                  <Menu.Item
                    icon={<ChartNoAxesCombined size={16} />}
                    key="4"
                    disabled
                  >
                    Analytics
                  </Menu.Item>
                  <Menu.Item icon={<Package size={16} />} key="3" disabled>
                    Products
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="System">
                  <Menu.Item icon={<Settings size={16} />} key="settings">
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<Route size={16} />} key="logs">
                    Logs
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Badge dot={false}>
                        <BellRing size={16} />
                      </Badge>
                    }
                    onClick={onShowNotifications}
                    disabled
                  >
                    <Flex justify="space-between" align="center">
                      <span>Notifications</span>
                      <Badge count={0} />
                    </Flex>
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
                  <div className="admin-card-name">
                    {user.fname} {user.lname}
                  </div>
                  <div className="admin-card-email">{user.email}</div>
                </div>

                <ChevronRight
                  className="admin-card-icon"
                  size={16}
                  color="white"
                />
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
                <BranchesPage />
              </Content>
            </Layout>
          </Layout>
        )}
        <Modal
          open={showNotifications}
          title={
            <Flex align="center" justify="center">
              <BellRing size={20} />
              <span style={{ marginLeft: 5 }}>Notifications</span>
            </Flex>
          }
          onCancel={() => setShowNotifications(false)}
          footer={false}
          styles={{
            body: {
              height: 400,
              overflowY: "scroll",
            },
          }}
        >
          <ul className="notifications-list">
            <li className="notifications-item">
              <div className="avatar">
                <Avatar size={60} src="./logo512.png" />
              </div>
              <div className="notification-content">
                <h4 className="">Support</h4>
                <p className="">Your Account has Been Suspended !</p>
              </div>
            </li>
            <li className="notifications-item  unread">
              <div className="avatar">
                <Avatar size={60} src="./logo512.png" />
              </div>
              <div className="notification-content">
                <h4 className="">Support</h4>
                <p className="">Your Account has Been Reactivated again !</p>
              </div>
            </li>
            <li className="notifications-item  active">
              <div className="avatar">
                <Avatar size={60} src="./logo512.png" />
              </div>
              <div className="notification-content ">
                <h4 className="">Support</h4>
                <p className="">a modrator deleted one of your clients</p>
              </div>
            </li>
          </ul>
        </Modal>
      </div>
    </>
  );
}

export default App;
