import "./BranchesPage.css";
import React from "react";

import { Flex, Divider, Card, Table, Tabs } from "antd";
import { Store } from "lucide-react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Stuff N",
    dataIndex: "stuffs",
    render: (stuffs) => stuffs.length,
  },
];

const data = [
  {
    name: "Hidra Store",
    stuffs: [
      {
        name: "abdelheq bourouni",
        email: "abdelheq.az201@gmail.com",
        password: "123456@Ab",
      },
      {
        name: "abdelheq bourouni",
        email: "abdelheq.az201@gmail.com",
        password: "123456@Ab",
      },
    ],
  },
  {
    name: "Ras El filaj ",
    stuffs: [
      {
        name: "abdelheq bourouni",
        email: "abdelheq.az201@gmail.com",
        password: "123456@Ab",
      },
    ],
  },
];

export default function BranchesPage() {
  return (
    <div className="page branches-page">
      <Flex align="center">
        <Store size={18} />
        <h1 className="headline">Branches</h1>
      </Flex>
      <Divider className="divider" />
      <Card style={{ flex: 1 }}>
        <Tabs />

        <Table
          style={{ flex: 1 }}
          dataSource={data}
          columns={columns}
          size="small"
          pagination={false}
          scroll={{
            x: null,
            y: "100%",
          }}
        />
      </Card>
    </div>
  );
}
