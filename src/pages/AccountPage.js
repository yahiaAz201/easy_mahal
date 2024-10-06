import "./AccountPage.css";
import React, { useState } from "react";

import { Button, Card, Divider, Flex, Input, Tag, Menu } from "antd";
import { Check, Save, Settings, Settings2, X } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="page account-page">
      <Flex align="center">
        <Settings size={18} />
        <h1 className="headline">Settings</h1>
      </Flex>
      <Divider className="divider" />
      <Card
        bordered={false}
        style={{ flex: 1 }}
        styles={{
          body: {
            padding: 10,
            height: "100%",
          },
        }}
      >
        <Flex vertical={false} style={{ height: "100%" }}>
          <Menu
            style={{ flex: 0.2, marginRight: 10 }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            className="sidebar-menu"
          >
            <Menu.Item key="account">Account</Menu.Item>
            <Menu.Item key="security">Security</Menu.Item>
          </Menu>
        </Flex>
      </Card>
    </div>
  );
}
