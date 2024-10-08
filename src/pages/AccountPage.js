import "./AccountPage.css";
import React, { useState } from "react";

import { Button, Card, Divider, Flex, Input, Tag, Menu } from "antd";
import {
  Check,
  CircleUser,
  Fingerprint,
  Save,
  Settings,
  Settings2,
  X,
} from "lucide-react";
import AppInputTextField from "../components/AppInputTextFeild";

export default function AccountPage() {
  return (
    <div className="page account-page">
      <Flex align="center">
        <Settings size={18} />
        <h1 className="headline">Settings</h1>
      </Flex>
      <Divider className="divider" />
      <Card
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
          >
            <Menu.Item icon={<CircleUser size={16} />} key="account">
              Account
            </Menu.Item>
            <Menu.Item icon={<Fingerprint size={16} />} key="security">
              Security
            </Menu.Item>
          </Menu>
          <Flex vertical flex={1}>
            <div
              className="tab-name"
              style={{
                margin: "5px 0",
                fontSize: 20,
                fontWeight: 400,
                marginBottom: 15,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircleUser size={24} />
              <span style={{ marginLeft: 10 }}>Account</span>
            </div>
            <Card style={{ flex: 1, marginBottom: 10 }}>
              <Flex></Flex>
            </Card>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
