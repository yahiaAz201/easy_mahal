import "./BranchesPage.css";
import React, { useEffect, useState } from "react";

import {
  Flex,
  Divider,
  Card,
  Table,
  Tabs,
  Avatar,
  Tooltip,
  Input,
  Dropdown,
  Collapse,
  Tag,
  Typography,
  Button,
  Select,
  Empty,
} from "antd";
import {
  ClipboardList,
  Store,
  Users,
  Cog,
  BadgeX,
  DiamondPlus,
  EllipsisVertical,
  EarthLock,
  Key,
  KeyRound,
  PlusSquare,
} from "lucide-react";
import { render } from "@testing-library/react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Clients N° ",
    dataIndex: "clientsNumber",
  },
  {
    title: "Employees",
    dataIndex: "employees",
    render: (employees) => {
      const limit = 4;

      return (
        <Avatar.Group>
          {employees.slice(0, limit).map((employee) => (
            <Tooltip title={employee.name} placement="top">
              <Avatar
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${employee.name}`}
              />
            </Tooltip>
          ))}
          {employees.length > limit && (
            <Tooltip title={"Others"} placement="top">
              <Avatar
                icon={<span>+{Math.max(employees.length - limit, 0)}</span>}
              />
            </Tooltip>
          )}
        </Avatar.Group>
      );
    },
  },
  {
    align: "center",
    width: 50,
    render: (client) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: (
                <Flex align="center">
                  <Cog size={15} style={{ marginRight: 5 }} />
                  <span>Edit</span>
                </Flex>
              ),
            },
            {
              key: "remove",
              label: (
                <Flex align="center">
                  <BadgeX size={15} style={{ marginRight: 5 }} />
                  <span>Remove</span>
                </Flex>
              ),
            },
            {
              type: "divider",
            },
            {
              key: "addPurchase",
              label: (
                <Flex align="center">
                  <DiamondPlus size={15} style={{ marginRight: 5 }} />
                  <span>Purchase</span>
                </Flex>
              ),
            },
          ],
        }}
        trigger={["click"]}
        onClick={(e) => e.stopPropagation()}
      >
        <EllipsisVertical size={15} />
      </Dropdown>
    ),
  },
];

const BRANCHES = [
  {
    _id: "1",
    name: "Hidra Store",
    clientsNumber: 300,
    employees: [
      {
        id: "1",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
        name: "Amine Bousmina",
        email: "abdelheq.az201@gmail.com",
        password: "123456@Abqdqsdqsdqsdsqd",
        role: {
          label: "Admin",
          value: "admin",
        },
      },
      {
        id: "2",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123!Secure",
        role: {
          label: "Admin",
          value: "admin",
        },
      },
      {
        id: "3",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "mypassword456@Safe",
        role: {
          label: "Viewer",
          value: "viewer",
        },
      },
      {
        id: "4",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "alicePassword789@Secure",
        role: {
          label: "Admin",
          value: "admin",
        },
      },
      {
        id: "5",
        name: "Bob Brown",
        email: "bob.brown@example.com",
        password: "bobBrown123@Secret",
        role: {
          label: "Viewer",
          value: "viewer",
        },
      },
    ],
  },
  {
    _id: "6",
    name: "Ras El filaj ",
    clientsNumber: 26,
    employees: [
      {
        id: "1",
        name: "amine bousmina",
        email: "abdelheq.az201@gmail.com",
        password: "123456@Abqdqsdqsdqsdsqd",
        role: {
          label: "Admin",
          value: "admin",
        },
      },
    ],
  },
  {
    _id: "7",
    name: "shop now",
    clientsNumber: 12,
    employees: [],
  },
];

const EMPLOYEES = [
  {
    id: "1",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    email: "abdelheq.az201@gmail.com",
    password: "123456@Abqdqsdqsdqsdsqd",
    branche: "Hidra Store",
    role: "Admin",
  },
  {
    id: "2",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123!Secure",
    branche: "Hidra Store",
    role: "Admin",
  },
  {
    id: "3",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "mypassword456@Safe",
    branche: "Hidra Store",
    role: "Viewer",
  },
  {
    id: "4",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "alicePassword789@Secure",
    branche: "Hidra Store",
    role: "Admin",
  },
  {
    id: "5",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "bobBrown123@Secret",
    branche: "Hidra Store",
    role: "Viewer",
  },
  {
    id: "1",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGuldiR1erCVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729018012263?e=1735171200&v=beta&t=pq9tK7QPNBj3cZVy2Q8-tE5DYl_Vj6nXTwuhLIc7HPo",
    name: "Amine Bousmina",
    name: "amine bousmina",
    email: "abdelheq.az201@gmail.com",
    password: "123456@Abqdqsdqsdqsdsqd",
    branche: "Hidra Store",
    role: "Admin",
  },
];

export default function BranchesPage() {
  const [activeTab, setActiveTab] = useState("MY_BRANCHES");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBranches = async () => {
    setLoading(true);
    let data = BRANCHES.map((branche) => ({ ...branche, key: branche._id }));
    setBranches(data);
    await new Promise((resolve) => setTimeout(() => resolve(), 3000));
    setLoading(false);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  function BranchesTab() {
    const [expandedRows, setExpandedRows] = useState([]);
    const ExpandedRowRender = (branche) => {
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (name, record) => (
            <Flex align="center">
              <Avatar
                src={
                  record.avatar ||
                  `https://api.dicebear.com/7.x/thumbs/svg?seed=${record.email}`
                }
              />

              <Tooltip title={name}>
                <span style={{ marginLeft: 10 }}>{name}</span>
              </Tooltip>
            </Flex>
          ),
        },
        {
          title: "Role",
          dataIndex: "role",
          render: (role) => (
            <Tag style={{ fontWeight: 500 }} color="#7E60BF">
              {role.label}
            </Tag>
          ),
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Password",
          dataIndex: "password",
          render: (password) => (
            <Tooltip
              title={
                <Flex align="center">
                  <ClipboardList size={12} />
                  <span style={{ marginLeft: 4 }}>Click to Copy</span>
                </Flex>
              }
            >
              <Input.Password variant="filled" value={password} readOnly />
            </Tooltip>
          ),
        },
      ];
      return (
        <Table
          size="small"
          columns={columns}
          dataSource={branche.employees}
          pagination={false}
          scroll={{
            y: 400,
          }}
        />
      );
    };

    const onRowClick = (record, rowIndex) => () => {
      if (!expandedRows.includes(record.key)) setExpandedRows([record.key]);
      else setExpandedRows([]);
    };

    return (
      <Table
        style={{ flex: 1 }}
        dataSource={branches}
        columns={columns}
        loading={loading}
        size="small"
        pagination={false}
        expandedRowKeys={expandedRows}
        expandable={{
          expandedRowRender: ExpandedRowRender,
        }}
        onRow={(...args) => ({
          onClick: onRowClick(...args),
        })}
        scroll={{
          y:
            window.document.documentElement.scrollHeight -
            (10 * 2 + 5 * 2 + 38 + 16 + 39),
        }}
      />
    );
  }

  function AllEmployees() {
    const [employees, setEmployees] = useState([]);

    const loadEmployees = () => {
      setEmployees(EMPLOYEES);
    };

    useEffect(() => {
      loadEmployees();
    }, []);

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (name, record) => (
          <Flex align="center">
            <Avatar src={record.avatar} />
            <Typography.Text style={{ marginLeft: 5 }}>{name}</Typography.Text>
          </Flex>
        ),
      },
      {
        title: "Role",
        dataIndex: "role",
        render: (role) => <Tag color="#7E60BF">{role}</Tag>,
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Password",
        dataIndex: "password",
        render: (password) => (
          <Tooltip
            title={
              <Flex align="center">
                <ClipboardList size={12} />
                <span style={{ marginLeft: 4 }}>Click to Copy</span>
              </Flex>
            }
          >
            <Input.Password variant="filled" value={password} readOnly />
          </Tooltip>
        ),
      },
      {
        title: "Branche",
        dataIndex: "branche",
        render: (branche) => <Tag color="purple">{branche}</Tag>,
      },
    ];

    return (
      <>
        <Flex align="flex-end" justify="space-around">
          <div style={{ flex: 1, marginRight: 5 }}>
            <Typography.Text style={{ fontWeight: 500 }}>Name</Typography.Text>
            <Input placeholder="Jhon Doe" allowClear />
          </div>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Typography.Text style={{ fontWeight: 500 }}>Role</Typography.Text>
            <Select
              style={{ display: "block" }}
              placeholder="Select a role"
              notFoundContent={
                <Flex
                  style={{ height: 200 }}
                  align="center"
                  justify="center"
                  vertical
                >
                  <Empty />
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    danger
                    icon={<PlusSquare size={18} />}
                    onClick={() => setActiveTab("ROLES_MANAGMENT")}
                  >
                    Role
                  </Button>
                </Flex>
              }
            />
          </div>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Typography.Text style={{ fontWeight: 500 }}>Email</Typography.Text>
            <Input placeholder="jhon.doe@gmail.com" allowClear />
          </div>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Typography.Text style={{ fontWeight: 500 }}>
              Password
            </Typography.Text>
            <Input.Password placeholder="**************" allowClear />
          </div>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Typography.Text style={{ fontWeight: 500 }}>
              Branche
            </Typography.Text>
            <Select
              style={{ display: "block" }}
              placeholder="Select a branche"
              options={branches.map((branche) => ({
                value: branche._id,
                label: branche.name,
              }))}
              notFoundContent={
                <Flex
                  style={{ height: 200 }}
                  align="center"
                  justify="center"
                  vertical
                >
                  <Empty />
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    danger
                    icon={<PlusSquare size={18} />}
                    onClick={() => setActiveTab("MY_BRANCHES")}
                  >
                    Branche
                  </Button>
                </Flex>
              }
            />
          </div>
          <Button
            type="primary"
            iconPosition="end"
            icon={<DiamondPlus size={18} />}
          >
            Create
          </Button>
        </Flex>
        <Divider />
        <Table columns={columns} dataSource={employees} size="small" />
      </>
    );
  }

  function RolesManagment(props) {
    return <h1>{JSON.stringify(props)}</h1>;
  }

  const tabs = [
    {
      key: "MY_BRANCHES",
      label: (
        <Flex align="center">
          <Store size={16} />
          <span style={{ marginLeft: 4, fontSize: 14, fontWeight: 500 }}>
            Branches
          </span>
        </Flex>
      ),
      children: <BranchesTab />,
    },
    {
      key: "ALL_EMPLOYEES",
      label: (
        <Flex align="center">
          <Users size={16} />
          <span style={{ marginLeft: 4, fontSize: 14, fontWeight: 500 }}>
            All Employees
          </span>
        </Flex>
      ),
      children: <AllEmployees />,
    },
    {
      key: "ROLES_MANAGMENT",
      label: (
        <Flex align="center">
          <EarthLock size={16} />
          <span style={{ marginLeft: 4, fontSize: 14, fontWeight: 500 }}>
            Role Managment
          </span>
        </Flex>
      ),
      children: <RolesManagment />,
    },
  ];

  return (
    <div className="page branches-page">
      <Card style={{ flex: 1 }}>
        <Tabs
          items={tabs}
          activeKey={activeTab}
          onTabClick={setActiveTab}
          size="small"
        />
      </Card>
    </div>
  );
}
