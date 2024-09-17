import "./HomePage.css";
import React, { useState, useRef, useEffect } from "react";

import {
  Divider,
  Table,
  Button,
  Modal,
  Tag,
  Badge,
  Dropdown,
  Flex,
  message,
  Input,
  DatePicker,
  Tooltip,
} from "antd";
import dayjs from "dayjs";

import {
  Printer,
  BadgePlus,
  EllipsisVertical,
  BadgeX,
  Cog,
  DiamondPlus,
  User,
  Package,
  Download,
  MousePointer2,
  UserPen,
} from "lucide-react";
import * as Yup from "yup";

import AppInputTextFeild from "../components/AppInputTextFeild";
import { ErrorMessage, Formik } from "formik";
import Toggle from "../components/Toggle";

const pageHeight =
  window.document.documentElement.scrollHeight - (99 + 53 + 32);

const CLIENTS_STATUS = {
  0: { name: "Clean", color: "#28A745" },
  1: { name: "Late ", color: "#C4E538	" },
  2: { name: "Suspended", color: "#FFC107" },
  5: { name: "Blocked", color: "#DC3545	" },
};

const USER = {
  ccp: {
    number: "0021006220",
    key: "21",
  },
  payDay: "12",
};

const NEW_CLIENTS = [
  {
    _id: "12a9b3f61e5d9e00c1f4b2a8",

    fname: "AZIZ",
    lname: "BOUCHAIR",
    ccp: {
      number: "0021456789",
      key: "12",
    },
    phone: "0776543210",
    status: 2,
    idn: "135792468013579695",
    createdAt: "2025-09-06T19:49:09.459Z",

    orders: [
      {
        _id: "1",
        name: "Iphone 15 Mini",
        amount: 600_000,
        nombre: 7,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
      {
        _id: "2",
        name: "Laptop HP",
        amount: 200_000,
        nombre: 12,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: false,
      },
      {
        _id: "3",
        name: "Samsung Fridge",
        amount: 10_000,
        nombre: 15,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: false,
      },
    ],
  },
  {
    _id: "23b1d6f82f9c1a00d3f6e2b7",
    fname: "SARA",
    lname: "BOUCHAREB",
    ccp: {
      number: "0021987654",
      key: "34",
    },
    phone: "0698765432",
    status: 2,
    idn: "246813579024680695",
    createdAt: "2023-09-06T19:50:12.459Z",

    orders: [
      {
        _id: "1",
        name: "Smartphone Samsung",
        amount: 90_000,
        nombre: 18,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "34e8f4b72c6f9d00e2c4d9f3",

    fname: "MOHAMED",
    lname: "BOURKA",
    ccp: {
      number: "0021098765",
      key: "56",
    },
    phone: "0754321987",
    status: 0,
    idn: "159753468012345695",
    createdAt: "2024-09-06T19:52:34.459Z",

    orders: [
      {
        _id: "1",
        name: "Tablet Lenovo",
        amount: 150_000,
        nombre: 30,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "45f2a3e91b8e2f00c3f5c1b4",

    fname: "NOUR",
    lname: "CHERIF",
    ccp: {
      number: "0021321654",
      key: "23",
    },
    phone: "0785432190",
    status: 5,
    idn: "123456789012345695",
    createdAt: "2024-09-06T19:54:10.459Z",

    orders: [
      {
        _id: "1",
        name: "Gaming PC",
        amount: 300_000,
        nombre: 20,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "56g7d5h84c9d7f00d4g8e7c5",

    fname: "SOUAD",
    lname: "LAMDANI",
    ccp: {
      number: "0021987432",
      key: "19",
    },
    phone: "0665432198",
    status: 1,
    idn: "135468024135791695",
    createdAt: "2024-09-06T19:55:20.459Z",

    orders: [
      {
        _id: "1",
        name: "Washing Machine LG",
        amount: 180_000,
        nombre: 25,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "67h9j6k95f1e8g00e5h9f8d6",

    fname: "AHMED",
    lname: "DJEBBOUR",
    ccp: {
      number: "0021123456",
      key: "45",
    },
    phone: "0776543212",
    status: 0,
    idn: "987654321012345695",
    createdAt: "2024-09-06T19:57:34.459Z",

    orders: [
      {
        _id: "1",
        name: "Fridge Beko",
        amount: 220_000,
        nombre: 12,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "78i2l7m96g2f9h00f6i1g9e7",

    fname: "NADIA",
    lname: "KACI",
    ccp: {
      number: "0021765432",
      key: "67",
    },
    phone: "0654321987",
    status: 0,
    idn: "123456789987654695",
    createdAt: "2024-09-06T19:58:10.459Z",

    orders: [
      {
        _id: "1",
        name: "Microwave Panasonic",
        amount: 95_000,
        nombre: 40,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "89j3n8o97h3g0i00g7j2h0f8",

    fname: "KARIM",
    lname: "BENMANSOUR",
    ccp: {
      number: "0021876543",
      key: "78",
    },
    phone: "0786543219",
    status: 5,
    idn: "159753246801357695",
    createdAt: "2024-09-06T19:59:12.459Z",

    orders: [
      {
        _id: "1",
        name: "Camera Canon",
        amount: 175_000,
        nombre: 35,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "90k4o9p98i4h1j00h8k3i1g9",

    fname: "LINA",
    lname: "SAID",
    ccp: {
      number: "0021098765",
      key: "21",
    },
    phone: "0676543218",
    status: 1,
    idn: "246813579013579695",
    createdAt: "2024-09-06T20:00:15.459Z",

    orders: [
      {
        _id: "1",
        name: "Smartwatch Apple",
        amount: 150_000,
        nombre: 22,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "12a5p0q99j5i2k00i9l4j2h0",

    fname: "SAMIR",
    lname: "OUALI",
    ccp: {
      number: "0021321456",
      key: "32",
    },
    phone: "0775432109",
    status: 0,
    idn: "135792468013579695",
    createdAt: "2024-09-06T20:01:18.459Z",

    orders: [
      {
        _id: "1",
        name: "Gaming Console PS5",
        amount: 120_000,
        nombre: 24,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "13b6q1r00k6j3l00j0m5k3i1",

    fname: "YASMINA",
    lname: "KHERBOUCHE",
    ccp: {
      number: "0021546789",
      key: "43",
    },
    phone: "0674321098",
    status: 2,
    idn: "987654321012345695",
    createdAt: "2024-09-06T20:02:22.459Z",

    orders: [
      {
        _id: "1",
        name: "Washing Machine Samsung",
        amount: 130_000,
        nombre: 36,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "14c7r2s11l7k4m00k1n6l4j2",

    fname: "HASSAN",
    lname: "BOUALI",
    ccp: {
      number: "0021674321",
      key: "54",
    },
    phone: "0783210987",
    status: 1,
    idn: "123456789012345695",
    createdAt: "2024-09-06T20:03:25.459Z",

    orders: [
      {
        _id: "1",
        name: "TV Sony",
        amount: 190_000,
        nombre: 45,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "15d8s3t22m8l5n00l2o7m5k3",

    fname: "SAMIRA",
    lname: "DJELLOULI",
    ccp: {
      number: "0021876543",
      key: "65",
    },
    phone: "0665432109",
    status: 1,
    idn: "135468024135791695",
    createdAt: "2024-09-06T20:04:28.459Z",

    orders: [
      {
        _id: "1",
        name: "Fridge Samsung",
        amount: 220_000,
        nombre: 20,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "16e9t4u33n9m6o00m3p8n6l4",

    fname: "FATIMA",
    lname: "HAMADI",
    ccp: {
      number: "0021234567",
      key: "76",
    },
    phone: "0653210987",
    status: 0,
    idn: "159753468013579695",
    createdAt: "2024-09-06T20:05:31.459Z",

    orders: [
      {
        _id: "1",
        name: "Dishwasher Bosch",
        amount: 145_000,
        nombre: 22,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
  {
    _id: "17f0u5v44o0n7p00n4q9o7m5",

    fname: "RACHID",
    lname: "SAOUDI",
    ccp: {
      number: "0021765432",
      key: "89",
    },
    phone: "0776543210",
    status: 0,
    idn: "987654321098765695",
    createdAt: "2024-09-06T20:06:34.459Z",

    orders: [
      {
        _id: "1",
        name: "Microwave LG",
        amount: 95_000,
        nombre: 40,
        dates: ["2024-09-06T19:49:09.459Z", "2025-02-06T19:49:09.459Z"],
        isPaid: true,
      },
    ],
  },
];

const userValidationSchema = Yup.object({
  fname: Yup.string().required().label("First Name"),
  lname: Yup.string().required().label("Last Name"),
  idn: Yup.string()
    .matches(/^\d{18}$/, "ID Number must be exactly 18 digits")
    .required()
    .label("ID Number"),
  phone: Yup.string()
    .required()
    .matches(
      /^(0(5|6|7)\d{8}|0(2|3|4|9)\d{7})$/,
      "Phone Number must be a valid Number"
    )
    .label("Phone Number"),

  ccp: Yup.object({
    number: Yup.string()
      .matches(/^\d{10}$/, "CCP N° must be exactly 10 digits") // 10 digits
      .required()
      .label("CCP N°"),
    key: Yup.string()
      .matches(/^\d{2}$/, "CCP Key must be exactly 2 digits") // 2 digits
      .required()
      .label("CCP Key"),
  }),
});

const orderValidationSchema = Yup.object({
  name: Yup.string().required().label("Product Name"),
  amount: Yup.number().required().label("Amount"),
  nombre: Yup.number().required().label("Nombre"),
  dates: Yup.array()
    .of(Yup.date().required("Date is required"))
    .min(2, "Please select a start and end date")
    .test(
      "endDateAfterStartDate",
      "End date must be after start date",
      (dates) => {
        if (!dates || dates.length < 2) return false;
        const [startDate, endDate] = dates;
        return endDate && startDate && endDate > startDate;
      }
    ),
});

export default function HomePage() {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isSelectEnabled, setIsSelectEnabled] = useState(false);

  const [clientModal, setClientModal] = useState(false);
  const [addNewPurchaseModal, setAddNewPurchaseModal] = useState(false);

  const [clientModalOp, setClientModalOp] = useState("add");
  const [purchaseModalOp, setPurchaseModalOp] = useState("add");

  const [confirmModal, confirmModalContextHolder] = Modal.useModal();

  const iframeRef = useRef(null);

  const [tempClient, setTempClient] = useState(null);

  useEffect(() => {
    const newClients = NEW_CLIENTS.map((client) => {
      client["orders"] = client.orders.map((order) => {
        order["key"] = order["_id"];
        return order;
      });
      client["key"] = client["_id"];
      return client;
    });
    setClients(newClients);
  }, []);

  useEffect(() => {
    if (!isSelectEnabled) setSelectedClients([]);
  }, [isSelectEnabled]);

  useEffect(() => {
    if (!clientModal) {
      setTempClient(null);
      setClientModalOp("add");
    }
  }, [clientModal]);

  const handleOnExpand = (record) => () => {
    if (!expandedRows.includes(record.key)) setExpandedRows([record.key]);
    else setExpandedRows([]);
  };

  const handleOnAddNewClientModalOpen = () => setClientModal(true);

  const handleOnAddNewClientModalCancel = () => setClientModal(false);

  const handleAddNewClient = async (clientData) => {
    const client = clientData;

    client["key"] = "415qs6d465sq4d" + Math.random() * 10000;
    client["createdAt"] = new Date().toISOString();
    client["status"] = 0;
    client["orders"] = [];

    setClients([client, ...clients]);
    setClientModal(false);
    message.success("New Client Added Successfully");
  };

  const openEditClientModal = (client) => {
    setTempClient(client);
    setClientModal(true);
    setClientModalOp("edit");
  };

  const handleEditClient = async (client, { setSubmitting }) => {
    console.log("client: ", client);

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 5000)
    );
    setSubmitting(false);
    setClientModal(false);
  };

  const handleDeleteClient = async (_client) => {
    const confirmed = await confirmModal.confirm({
      title: "Delete",
      content: "Are you sure you wanna delete this !",
    });
    if (!confirmed) return;
    let new_clients = [...clients];
    const client_index = new_clients.findIndex(
      (client) => client._id == _client._id
    );
    new_clients.splice(client_index, 1);
    setClients(new_clients);
    message.success(
      <span>
        Client{" "}
        <span style={{ color: "red", fontWeight: 500 }}>
          {_client.fname} {_client.lname}
        </span>{" "}
        Successfully Deleted
      </span>
    );
  };

  const handleAddPurchase = (client) => {
    setTempClient(client);
    setAddNewPurchaseModal(true);
  };

  const handleCancelNewPurchase = () => {
    setAddNewPurchaseModal(false);
  };

  const handleSubmitNewPurchase = async (purchase) => {
    const newPurchase = { ...purchase };
    const newDates = [...newPurchase.dates];
    const [startDate, endDate] = newDates;
    newDates[0] = startDate.toISOString();
    newDates[1] = endDate.toISOString();
    newPurchase["_id"] = "qs1d321qsd5" + Math.random() * 1000000;
    newPurchase["dates"] = newDates;
    newPurchase["isPaid"] = false;

    console.log("client: ", tempClient);
    console.log("purchase: ", newPurchase);

    const client_index = clients.findIndex(
      (client) => client._id == tempClient._id
    );
    if (client_index == -1) return;
    const new_clients = [...clients];
    const orders = new_clients[client_index].orders;
    new_clients[client_index].orders = [newPurchase, ...orders];
    setClients(new_clients);
    setAddNewPurchaseModal(false);
    setTempClient(null);
    message.success("New Purchase Added Successfully");
  };

  const handleEditOrder = (order, client) => () => {
    console.log("Edit Order", order._id, client._id);
  };

  const handleDeleteOrder = (_order, _client) => async () => {
    const confirmed = await confirmModal.confirm({
      title: "Delete",
      content: "Are you sure you wanna delete this !",
    });
    if (!confirmed) return;
    let new_clients = [...clients];
    const client_index = new_clients.findIndex(
      (client) => client._id === _client._id
    );
    if (client_index === -1) return;
    const new_orders = [...new_clients[client_index].orders];
    const order_index = new_orders.findIndex(
      (order) => order._id === _order._id
    );
    if (order_index === -1) return;
    new_orders.splice(order_index, 1);
    new_clients[client_index].orders = new_orders;
    setClients(new_clients);

    message.success(
      <span>
        Order{" "}
        <span style={{ color: "red", fontWeight: 500 }}>{_order.name}</span>{" "}
        Successfully Deleted
      </span>
    );
  };

  const handlePrintOrder = (order, client) => () => {
    const startDate = new Date(order.dates[0]);
    const sDay = String(startDate.getDate()).padStart(2, "0"); // Day
    const sMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Month (getMonth() returns 0-11, so +1)
    const sYear = startDate.getFullYear();

    const endtDate = new Date(order.dates[1]);
    const eDay = String(endtDate.getDate()).padStart(2, "0"); // Day
    const eMonth = String(endtDate.getMonth() + 1).padStart(2, "0"); // Month (getMonth() returns 0-11, so +1)
    const eYear = endtDate.getFullYear();

    const nombre = String(order.nombre).padStart(2, "0");

    const data = `   <div class="page">
      <article>
        <header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="40px"
            height="48px"
            viewBox="0 0 40 47"
            version="1.1"
          >
            <g id="surface1">
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(99.607843%, 80%, 4.313725%);
                  fill-opacity: 1;
                "
                d="M 30.269531 25.964844 C 25.582031 28.972656 21.527344 30.8125 18.097656 31.738281 L 18.089844 29.179688 L 13.125 30.667969 L 13.117188 32.496094 C 2.476562 32.628906 1.035156 21.390625 8.304688 13.945312 C 3.4375 25.046875 20.027344 23.230469 27.160156 24.265625 C 29.042969 24.539062 30.269531 25.007812 30.269531 25.964844 Z M 30.269531 25.964844 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 34.984375 33.152344 L 34.984375 34.503906 L 31.894531 35.429688 L 31.894531 34.078125 Z M 34.984375 33.152344 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 18.800781 37.527344 L 18.800781 39.011719 L 18.089844 39.222656 L 15.644531 39.957031 L 15.644531 38.476562 L 18.089844 37.742188 Z M 18.800781 37.527344 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 15.132812 38.773438 L 15.132812 40.257812 L 13.125 40.859375 L 11.976562 41.203125 L 11.976562 39.722656 L 13.125 39.378906 Z M 15.132812 38.773438 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 36.378906 26.921875 L 36.378906 29.660156 C 36.378906 30.175781 35.914062 30.828125 34.855469 31.203125 L 31.722656 32.140625 L 30.558594 32.488281 L 30.558594 36.613281 C 30.53125 37.414062 29.890625 37.816406 29.367188 38.015625 L 25.800781 39.085938 L 24.199219 39.566406 C 24.199219 39.566406 20.671875 40.625 20.640625 40.632812 C 19.921875 40.785156 19.640625 40.4375 19.601562 40.109375 L 19.601562 37.289062 L 24.199219 35.914062 L 24.199219 37.566406 C 24.199219 38.0625 25.785156 37.945312 25.800781 37.257812 L 25.800781 30.09375 L 30.480469 28.691406 L 30.480469 30.507812 C 30.773438 31.046875 31.886719 30.894531 31.898438 30.160156 L 31.898438 28.265625 L 34.984375 27.34375 Z M 36.378906 26.921875 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 30.617188 25.523438 C 37.601562 20.25 42.027344 10.238281 0.660156 6.496094 C 36.828125 -9.554688 49.398438 12.683594 30.617188 25.523438 Z M 30.617188 25.523438 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 24.199219 30.574219 L 24.199219 33.722656 C 24.199219 34.054688 23.886719 34.511719 23.296875 34.664062 L 19.601562 35.773438 L 18.800781 36.011719 L 18.089844 36.226562 L 15.644531 36.957031 L 15.132812 37.113281 L 13.125 37.710938 L 11.976562 38.058594 L 11.816406 38.105469 L 8.53125 39.089844 C 7.777344 39.210938 7.042969 38.953125 6.925781 38.402344 L 6.925781 35.75 L 11.816406 34.285156 L 11.816406 36.339844 C 11.898438 36.664062 13.050781 36.578125 13.097656 36.050781 L 13.117188 32.496094 L 13.125 30.667969 L 18.089844 29.179688 L 18.097656 31.738281 L 18.109375 34.320312 C 18.132812 34.746094 19.339844 34.484375 19.335938 33.96875 L 19.324219 32.035156 L 19.601562 31.949219 Z M 24.199219 30.574219 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 5.105469 45.722656 L 5.878906 43.5 L 6.253906 43.5 L 7.023438 45.722656 L 6.703125 45.722656 L 6.496094 45.101562 L 5.621094 45.101562 L 5.414062 45.722656 Z M 6.410156 44.851562 L 6.058594 43.800781 L 5.707031 44.851562 Z M 6.410156 44.851562 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 9.292969 45.722656 L 7.96875 45.722656 L 7.96875 43.5 L 8.269531 43.5 L 8.269531 45.460938 L 9.292969 45.460938 Z M 9.292969 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 10.984375 45.765625 C 10.820312 45.765625 10.671875 45.742188 10.539062 45.695312 C 10.40625 45.648438 10.289062 45.574219 10.195312 45.476562 C 10.097656 45.378906 10.023438 45.257812 9.972656 45.109375 C 9.921875 44.964844 9.894531 44.796875 9.894531 44.609375 C 9.894531 44.429688 9.921875 44.269531 9.972656 44.128906 C 10.023438 43.984375 10.097656 43.863281 10.195312 43.765625 C 10.289062 43.667969 10.402344 43.589844 10.539062 43.539062 C 10.675781 43.484375 10.824219 43.460938 10.988281 43.460938 C 11.0625 43.460938 11.136719 43.464844 11.207031 43.476562 C 11.277344 43.488281 11.347656 43.5 11.410156 43.519531 C 11.460938 43.535156 11.519531 43.554688 11.582031 43.582031 C 11.644531 43.609375 11.695312 43.632812 11.734375 43.648438 L 11.734375 44.007812 L 11.710938 44.007812 C 11.671875 43.972656 11.632812 43.945312 11.589844 43.914062 C 11.550781 43.886719 11.492188 43.851562 11.421875 43.820312 C 11.359375 43.789062 11.289062 43.765625 11.207031 43.746094 C 11.128906 43.726562 11.042969 43.714844 10.949219 43.714844 C 10.730469 43.714844 10.550781 43.796875 10.414062 43.957031 C 10.28125 44.117188 10.210938 44.332031 10.210938 44.601562 C 10.210938 44.75 10.230469 44.878906 10.265625 44.992188 C 10.300781 45.105469 10.351562 45.199219 10.421875 45.277344 C 10.488281 45.351562 10.566406 45.410156 10.660156 45.453125 C 10.75 45.492188 10.855469 45.511719 10.972656 45.511719 C 11.058594 45.511719 11.144531 45.507812 11.226562 45.496094 C 11.3125 45.480469 11.386719 45.464844 11.441406 45.441406 L 11.441406 44.867188 L 10.914062 44.867188 L 10.914062 44.605469 L 11.746094 44.605469 L 11.746094 45.578125 C 11.707031 45.59375 11.652344 45.613281 11.589844 45.640625 C 11.523438 45.667969 11.460938 45.6875 11.40625 45.703125 C 11.332031 45.722656 11.265625 45.738281 11.203125 45.75 C 11.144531 45.761719 11.070312 45.765625 10.984375 45.765625 Z M 10.984375 45.765625 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 13.226562 43.761719 L 13.226562 44.371094 L 14.277344 44.371094 L 14.277344 44.632812 L 13.226562 44.632812 L 13.226562 45.460938 L 14.355469 45.460938 L 14.355469 45.722656 L 12.921875 45.722656 L 12.921875 43.5 L 13.367188 43.5 L 13.597656 43.015625 L 13.789062 43.132812 L 13.59375 43.5 L 14.355469 43.5 L 14.355469 43.761719 Z M 13.226562 43.761719 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 16.792969 45.722656 L 16.398438 45.722656 L 15.671875 44.839844 L 15.324219 44.839844 L 15.324219 45.722656 L 15.019531 45.722656 L 15.019531 43.5 L 15.609375 43.5 C 15.742188 43.5 15.851562 43.507812 15.9375 43.519531 C 16.027344 43.535156 16.113281 43.566406 16.191406 43.617188 C 16.273438 43.667969 16.335938 43.730469 16.382812 43.808594 C 16.429688 43.890625 16.453125 43.988281 16.453125 44.101562 C 16.453125 44.265625 16.410156 44.402344 16.324219 44.511719 C 16.238281 44.621094 16.125 44.703125 15.976562 44.757812 Z M 16.132812 44.125 C 16.132812 44.0625 16.121094 44.003906 16.097656 43.953125 C 16.074219 43.902344 16.039062 43.863281 15.988281 43.828125 C 15.945312 43.800781 15.894531 43.78125 15.839844 43.769531 C 15.78125 43.757812 15.710938 43.753906 15.625 43.753906 L 15.324219 43.753906 L 15.324219 44.59375 L 15.589844 44.59375 C 15.679688 44.59375 15.757812 44.585938 15.824219 44.570312 C 15.894531 44.554688 15.957031 44.523438 16.003906 44.476562 C 16.046875 44.4375 16.082031 44.386719 16.101562 44.328125 C 16.125 44.269531 16.132812 44.203125 16.132812 44.125 Z M 16.132812 44.125 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 17.738281 45.722656 L 17.4375 45.722656 L 17.4375 43.5 L 17.742188 43.5 L 17.738281 43.726562 Z M 17.738281 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 18.808594 45.722656 L 18.808594 43.5 L 20.238281 43.5 L 20.238281 43.761719 L 19.109375 43.761719 L 19.109375 44.371094 L 20.160156 44.371094 L 20.160156 44.632812 L 19.109375 44.632812 L 19.109375 45.460938 L 20.238281 45.460938 L 20.238281 45.722656 Z M 18.808594 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 24.367188 44.046875 C 24.367188 44.160156 24.347656 44.265625 24.304688 44.363281 C 24.261719 44.464844 24.199219 44.546875 24.117188 44.617188 C 24.066406 44.65625 24.011719 44.695312 23.949219 44.730469 C 23.890625 44.765625 23.824219 44.796875 23.753906 44.820312 C 23.679688 44.84375 23.601562 44.863281 23.515625 44.878906 C 23.429688 44.890625 23.335938 44.898438 23.230469 44.898438 L 22.84375 44.898438 L 22.84375 45.679688 L 22.101562 45.679688 L 22.101562 43.296875 L 23.246094 43.296875 C 23.414062 43.296875 23.5625 43.308594 23.683594 43.332031 C 23.808594 43.359375 23.921875 43.398438 24.019531 43.453125 C 24.132812 43.511719 24.21875 43.589844 24.277344 43.691406 C 24.339844 43.792969 24.367188 43.910156 24.367188 44.046875 Z M 23.609375 44.0625 C 23.609375 43.996094 23.589844 43.9375 23.550781 43.886719 C 23.511719 43.839844 23.464844 43.804688 23.40625 43.789062 C 23.339844 43.761719 23.269531 43.75 23.207031 43.746094 C 23.144531 43.742188 23.058594 43.738281 22.949219 43.738281 L 22.84375 43.738281 L 22.84375 44.453125 L 22.894531 44.453125 C 22.964844 44.453125 23.03125 44.453125 23.089844 44.453125 C 23.152344 44.449219 23.207031 44.445312 23.253906 44.441406 C 23.292969 44.433594 23.335938 44.425781 23.378906 44.410156 C 23.421875 44.394531 23.457031 44.375 23.480469 44.355469 C 23.53125 44.316406 23.566406 44.277344 23.582031 44.234375 C 23.601562 44.191406 23.609375 44.132812 23.609375 44.0625 Z M 23.609375 44.0625 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 27.679688 44.488281 C 27.679688 44.871094 27.550781 45.175781 27.296875 45.394531 C 27.042969 45.617188 26.695312 45.726562 26.25 45.726562 C 25.804688 45.726562 25.457031 45.617188 25.203125 45.390625 C 24.953125 45.167969 24.824219 44.867188 24.824219 44.488281 C 24.824219 44.105469 24.953125 43.800781 25.203125 43.578125 C 25.457031 43.355469 25.804688 43.246094 26.25 43.246094 C 26.695312 43.246094 27.042969 43.355469 27.296875 43.578125 C 27.550781 43.800781 27.679688 44.101562 27.679688 44.488281 Z M 26.914062 44.484375 C 26.914062 44.34375 26.898438 44.222656 26.859375 44.125 C 26.824219 44.023438 26.777344 43.941406 26.714844 43.878906 C 26.652344 43.8125 26.582031 43.765625 26.5 43.738281 C 26.421875 43.710938 26.339844 43.695312 26.253906 43.695312 C 26.160156 43.695312 26.078125 43.707031 26.003906 43.734375 C 25.933594 43.761719 25.859375 43.808594 25.792969 43.875 C 25.730469 43.9375 25.683594 44.019531 25.644531 44.121094 C 25.605469 44.222656 25.589844 44.34375 25.589844 44.488281 C 25.589844 44.632812 25.605469 44.753906 25.640625 44.851562 C 25.675781 44.949219 25.726562 45.027344 25.789062 45.09375 C 25.851562 45.160156 25.921875 45.207031 26.003906 45.234375 C 26.085938 45.265625 26.167969 45.277344 26.253906 45.277344 C 26.339844 45.277344 26.425781 45.261719 26.507812 45.230469 C 26.589844 45.203125 26.660156 45.15625 26.71875 45.089844 C 26.78125 45.019531 26.828125 44.941406 26.863281 44.847656 C 26.898438 44.757812 26.914062 44.636719 26.914062 44.484375 Z M 26.914062 44.484375 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 29.257812 45.722656 C 29.03125 45.722656 28.835938 45.703125 28.664062 45.667969 C 28.492188 45.632812 28.335938 45.589844 28.1875 45.539062 L 28.1875 44.972656 L 28.253906 44.972656 C 28.402344 45.070312 28.566406 45.148438 28.742188 45.203125 C 28.921875 45.257812 29.09375 45.285156 29.261719 45.285156 C 29.304688 45.285156 29.359375 45.28125 29.429688 45.273438 C 29.496094 45.265625 29.554688 45.253906 29.597656 45.238281 C 29.648438 45.222656 29.691406 45.195312 29.726562 45.164062 C 29.761719 45.132812 29.78125 45.089844 29.78125 45.035156 C 29.78125 44.976562 29.75 44.925781 29.691406 44.890625 C 29.632812 44.851562 29.566406 44.824219 29.484375 44.808594 C 29.382812 44.785156 29.277344 44.765625 29.164062 44.746094 C 29.050781 44.726562 28.941406 44.703125 28.84375 44.675781 C 28.617188 44.609375 28.453125 44.523438 28.355469 44.414062 C 28.253906 44.304688 28.207031 44.167969 28.207031 44 C 28.207031 43.777344 28.324219 43.597656 28.554688 43.460938 C 28.789062 43.320312 29.082031 43.25 29.429688 43.25 C 29.605469 43.25 29.78125 43.265625 29.953125 43.296875 C 30.125 43.324219 30.28125 43.363281 30.417969 43.410156 L 30.417969 43.957031 L 30.351562 43.957031 C 30.242188 43.878906 30.109375 43.816406 29.953125 43.765625 C 29.796875 43.710938 29.632812 43.683594 29.46875 43.683594 C 29.402344 43.683594 29.34375 43.6875 29.292969 43.695312 C 29.242188 43.703125 29.1875 43.71875 29.132812 43.738281 C 29.085938 43.757812 29.046875 43.78125 29.011719 43.816406 C 28.976562 43.847656 28.960938 43.886719 28.960938 43.929688 C 28.960938 43.988281 28.988281 44.039062 29.042969 44.074219 C 29.09375 44.109375 29.199219 44.140625 29.351562 44.171875 C 29.449219 44.1875 29.542969 44.207031 29.636719 44.222656 C 29.726562 44.238281 29.824219 44.265625 29.929688 44.292969 C 30.132812 44.351562 30.285156 44.433594 30.386719 44.535156 C 30.484375 44.636719 30.535156 44.769531 30.535156 44.933594 C 30.535156 45.171875 30.421875 45.359375 30.191406 45.503906 C 29.960938 45.648438 29.648438 45.722656 29.257812 45.722656 Z M 29.257812 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 31.710938 45.679688 L 31.710938 43.75 L 30.839844 43.75 L 30.839844 43.296875 L 33.320312 43.296875 L 33.320312 43.75 L 32.449219 43.75 L 32.449219 45.679688 Z M 31.710938 45.679688 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 33.859375 45.679688 L 33.859375 43.296875 L 35.847656 43.296875 L 35.847656 43.75 L 34.59375 43.75 L 34.59375 44.167969 L 35.75 44.167969 L 35.75 44.621094 L 34.59375 44.621094 L 34.59375 45.222656 L 35.847656 45.222656 L 35.847656 45.675781 L 33.859375 45.675781 Z M 33.859375 45.679688 "
              />
            </g>
          </svg>
          <div class="titles">
            <h4>DEMANDE DE PRELEVEMENT SUR COMPTE CCP</h4>
            <h6>INFORMATIONS DU TITULAIRE DE COMPTE CCP</h6>
          </div>
        </header>
        <form>
          <div class="input-filed">
            <label for="fullname">Nom et Prenom</label>
            <input id="fullname" type="text" value="${client.fname} ${
      client.lname
    }" />
          </div>
          <div class="input-filed">
            <label for="nin">n° identifiant national</label>
            <div class="pin">
           <input type="text" value="${client.idn[0]}" />
              <input type="text" value="${client.idn[1]}" />
              <input type="text" value="${client.idn[2]}" />
              <input type="text" value="${client.idn[3]}" />
              <input type="text" value="${client.idn[4]}" />
              <input type="text" value="${client.idn[5]}" />
              <input type="text" value="${client.idn[6]}" />
              <input type="text" value="${client.idn[7]}" />
              <input type="text" value="${client.idn[8]}" />
              <input type="text" value="${client.idn[9]}" />
              <input type="text" value="${client.idn[10]}" />
              <input type="text" value="${client.idn[11]}" />
              <input type="text" value="${client.idn[12]}" />
              <input type="text" value="${client.idn[13]}" />
              <input type="text" value="${client.idn[14]}" />
              <input type="text" value="${client.idn[15]}" />
              <input type="text" value="${client.idn[16]}" />
              <input type="text" value="${client.idn[17]}" />
            </div>
          </div>
          <div style="display: flex">
            <div class="input-filed">
              <label for="nccd">n° compte ccp a debiter</label>
              <div class="pin">
                <input type="text" value="${client.ccp.number[0]}" />
                <input type="text" value="${client.ccp.number[1]}" />
                <input type="text" value="${client.ccp.number[2]}" />
                <input type="text" value="${client.ccp.number[3]}" />
                <input type="text" value="${client.ccp.number[4]}" />
                <input type="text" value="${client.ccp.number[5]}" />
                <input type="text" value="${client.ccp.number[6]}" />
                <input type="text" value="${client.ccp.number[7]}" />
                <input type="text" value="${client.ccp.number[8]}" />
                <input type="text" value="${client.ccp.number[9]}" />
              </div>
            </div>
            <div class="input-filed">
              <label for="cle" style="width: auto; margin: 0 10px">clé</label>
              <div class="pin" style="margin-right: 5px">
                <input type="text" value="${client.ccp.key[0]}" />
                <input type="text" value="${client.ccp.key[1]}" />
              </div>
            </div>
          </div>
          <div style="display: flex">
            <div class="input-filed">
              <label for="nccc">n° compte ccp a crediter</label>
              <div class="pin">
                <input type="text" value="${USER.ccp.number[0]}" />
                <input type="text" value="${USER.ccp.number[1]}" />
                <input type="text" value="${USER.ccp.number[2]}" />
                <input type="text" value="${USER.ccp.number[3]}" />
                <input type="text" value="${USER.ccp.number[4]}" />
                <input type="text" value="${USER.ccp.number[5]}" />
                <input type="text" value="${USER.ccp.number[6]}" />
                <input type="text" value="${USER.ccp.number[7]}" />
                <input type="text" value="${USER.ccp.number[8]}" />
                <input type="text" value="${USER.ccp.number[9]}" />
              </div>
            </div>
            <div class="input-filed">
              <label for="cle" style="width: auto; margin: 0 10px">clé</label>
              <div class="pin" style="margin-right: 5px">
               <input type="text" value="${USER.ccp.key[0]}" />
                <input type="text" value="${USER.ccp.key[1]}" />
              </div>
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">jour de prelevement dans le mois</label>
            <div class="pin">
                <input type="text" value="${USER.payDay[0]}" />
              <input type="text" value="${USER.payDay[1]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">date debut prelevelent</label>
            <div class="pin">
              <input type="text" value="${sDay[0]}" />
              <input type="text" value="${sDay[1]}" />
              <span class="slash"></span>
              <input type="text" value="${sMonth[0]}" />
              <input type="text" value="${sMonth[1]}" />
              <span class="slash"></span>
              <input type="text" value="${sYear.toString()[0]}" />
              <input type="text" value="${sYear.toString()[1]}" />
              <input type="text" value="${sYear.toString()[2]}" />
              <input type="text" value="${sYear.toString()[3]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="dfp">date fin prelevelent</label>
            <div class="pin">
                <input type="text" value="${eDay[0]}" />
              <input type="text" value="${eDay[1]}" />
              <span class="slash"></span>
              <input type="text" value="${eMonth[0]}" />
              <input type="text" value="${eMonth[1]}" />
              <span class="slash"></span>
              <input type="text" value="${eYear.toString()[0]}" />
              <input type="text" value="${eYear.toString()[1]}" />
              <input type="text" value="${eYear.toString()[2]}" />
              <input type="text" value="${eYear.toString()[3]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="amount">montant a prelever</label>
            <input id="amount" type="text" value="${order.amount}" />
          </div>
          <div class="input-filed">
            <label for="nmbr">nomber</label>
            <div class="pin">
              <input type="text" value="${nombre.toString()[0]}" />
              <input type="text" value="${nombre.toString()[1]}" />
            </div>
          </div>
        </form>
        <h6>CADRE RESERVE AU CCP</h6>
        <section class="acceptness-form">
          <div class="header">
            <span class="question">DEMANDE ACCEPTEE:</span>
            <span class="answer">OUI</span>
            <span class="answer">NO</span>
          </div>
          <div class="reason">
            <span>MOTIF DU REJET:</span>
            <span>
              ......................................................................................................................................................................................................................
            </span>
            <div style="font-size:8px; margin-top:5px;" >(1) Barrer la mention lnutlle</div>
          </div>
        </section>
        <h5 class="note">*A remplir par le titulaire du Compte CCP</h5>
      </article>
      <div class="divider"></div>
      <article>
        <header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="40px"
            height="48px"
            viewBox="0 0 40 47"
            version="1.1"
          >
            <g id="surface1">
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(99.607843%, 80%, 4.313725%);
                  fill-opacity: 1;
                "
                d="M 30.269531 25.964844 C 25.582031 28.972656 21.527344 30.8125 18.097656 31.738281 L 18.089844 29.179688 L 13.125 30.667969 L 13.117188 32.496094 C 2.476562 32.628906 1.035156 21.390625 8.304688 13.945312 C 3.4375 25.046875 20.027344 23.230469 27.160156 24.265625 C 29.042969 24.539062 30.269531 25.007812 30.269531 25.964844 Z M 30.269531 25.964844 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 34.984375 33.152344 L 34.984375 34.503906 L 31.894531 35.429688 L 31.894531 34.078125 Z M 34.984375 33.152344 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 18.800781 37.527344 L 18.800781 39.011719 L 18.089844 39.222656 L 15.644531 39.957031 L 15.644531 38.476562 L 18.089844 37.742188 Z M 18.800781 37.527344 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 15.132812 38.773438 L 15.132812 40.257812 L 13.125 40.859375 L 11.976562 41.203125 L 11.976562 39.722656 L 13.125 39.378906 Z M 15.132812 38.773438 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 36.378906 26.921875 L 36.378906 29.660156 C 36.378906 30.175781 35.914062 30.828125 34.855469 31.203125 L 31.722656 32.140625 L 30.558594 32.488281 L 30.558594 36.613281 C 30.53125 37.414062 29.890625 37.816406 29.367188 38.015625 L 25.800781 39.085938 L 24.199219 39.566406 C 24.199219 39.566406 20.671875 40.625 20.640625 40.632812 C 19.921875 40.785156 19.640625 40.4375 19.601562 40.109375 L 19.601562 37.289062 L 24.199219 35.914062 L 24.199219 37.566406 C 24.199219 38.0625 25.785156 37.945312 25.800781 37.257812 L 25.800781 30.09375 L 30.480469 28.691406 L 30.480469 30.507812 C 30.773438 31.046875 31.886719 30.894531 31.898438 30.160156 L 31.898438 28.265625 L 34.984375 27.34375 Z M 36.378906 26.921875 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 30.617188 25.523438 C 37.601562 20.25 42.027344 10.238281 0.660156 6.496094 C 36.828125 -9.554688 49.398438 12.683594 30.617188 25.523438 Z M 30.617188 25.523438 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 24.199219 30.574219 L 24.199219 33.722656 C 24.199219 34.054688 23.886719 34.511719 23.296875 34.664062 L 19.601562 35.773438 L 18.800781 36.011719 L 18.089844 36.226562 L 15.644531 36.957031 L 15.132812 37.113281 L 13.125 37.710938 L 11.976562 38.058594 L 11.816406 38.105469 L 8.53125 39.089844 C 7.777344 39.210938 7.042969 38.953125 6.925781 38.402344 L 6.925781 35.75 L 11.816406 34.285156 L 11.816406 36.339844 C 11.898438 36.664062 13.050781 36.578125 13.097656 36.050781 L 13.117188 32.496094 L 13.125 30.667969 L 18.089844 29.179688 L 18.097656 31.738281 L 18.109375 34.320312 C 18.132812 34.746094 19.339844 34.484375 19.335938 33.96875 L 19.324219 32.035156 L 19.601562 31.949219 Z M 24.199219 30.574219 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 5.105469 45.722656 L 5.878906 43.5 L 6.253906 43.5 L 7.023438 45.722656 L 6.703125 45.722656 L 6.496094 45.101562 L 5.621094 45.101562 L 5.414062 45.722656 Z M 6.410156 44.851562 L 6.058594 43.800781 L 5.707031 44.851562 Z M 6.410156 44.851562 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 9.292969 45.722656 L 7.96875 45.722656 L 7.96875 43.5 L 8.269531 43.5 L 8.269531 45.460938 L 9.292969 45.460938 Z M 9.292969 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 10.984375 45.765625 C 10.820312 45.765625 10.671875 45.742188 10.539062 45.695312 C 10.40625 45.648438 10.289062 45.574219 10.195312 45.476562 C 10.097656 45.378906 10.023438 45.257812 9.972656 45.109375 C 9.921875 44.964844 9.894531 44.796875 9.894531 44.609375 C 9.894531 44.429688 9.921875 44.269531 9.972656 44.128906 C 10.023438 43.984375 10.097656 43.863281 10.195312 43.765625 C 10.289062 43.667969 10.402344 43.589844 10.539062 43.539062 C 10.675781 43.484375 10.824219 43.460938 10.988281 43.460938 C 11.0625 43.460938 11.136719 43.464844 11.207031 43.476562 C 11.277344 43.488281 11.347656 43.5 11.410156 43.519531 C 11.460938 43.535156 11.519531 43.554688 11.582031 43.582031 C 11.644531 43.609375 11.695312 43.632812 11.734375 43.648438 L 11.734375 44.007812 L 11.710938 44.007812 C 11.671875 43.972656 11.632812 43.945312 11.589844 43.914062 C 11.550781 43.886719 11.492188 43.851562 11.421875 43.820312 C 11.359375 43.789062 11.289062 43.765625 11.207031 43.746094 C 11.128906 43.726562 11.042969 43.714844 10.949219 43.714844 C 10.730469 43.714844 10.550781 43.796875 10.414062 43.957031 C 10.28125 44.117188 10.210938 44.332031 10.210938 44.601562 C 10.210938 44.75 10.230469 44.878906 10.265625 44.992188 C 10.300781 45.105469 10.351562 45.199219 10.421875 45.277344 C 10.488281 45.351562 10.566406 45.410156 10.660156 45.453125 C 10.75 45.492188 10.855469 45.511719 10.972656 45.511719 C 11.058594 45.511719 11.144531 45.507812 11.226562 45.496094 C 11.3125 45.480469 11.386719 45.464844 11.441406 45.441406 L 11.441406 44.867188 L 10.914062 44.867188 L 10.914062 44.605469 L 11.746094 44.605469 L 11.746094 45.578125 C 11.707031 45.59375 11.652344 45.613281 11.589844 45.640625 C 11.523438 45.667969 11.460938 45.6875 11.40625 45.703125 C 11.332031 45.722656 11.265625 45.738281 11.203125 45.75 C 11.144531 45.761719 11.070312 45.765625 10.984375 45.765625 Z M 10.984375 45.765625 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 13.226562 43.761719 L 13.226562 44.371094 L 14.277344 44.371094 L 14.277344 44.632812 L 13.226562 44.632812 L 13.226562 45.460938 L 14.355469 45.460938 L 14.355469 45.722656 L 12.921875 45.722656 L 12.921875 43.5 L 13.367188 43.5 L 13.597656 43.015625 L 13.789062 43.132812 L 13.59375 43.5 L 14.355469 43.5 L 14.355469 43.761719 Z M 13.226562 43.761719 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 16.792969 45.722656 L 16.398438 45.722656 L 15.671875 44.839844 L 15.324219 44.839844 L 15.324219 45.722656 L 15.019531 45.722656 L 15.019531 43.5 L 15.609375 43.5 C 15.742188 43.5 15.851562 43.507812 15.9375 43.519531 C 16.027344 43.535156 16.113281 43.566406 16.191406 43.617188 C 16.273438 43.667969 16.335938 43.730469 16.382812 43.808594 C 16.429688 43.890625 16.453125 43.988281 16.453125 44.101562 C 16.453125 44.265625 16.410156 44.402344 16.324219 44.511719 C 16.238281 44.621094 16.125 44.703125 15.976562 44.757812 Z M 16.132812 44.125 C 16.132812 44.0625 16.121094 44.003906 16.097656 43.953125 C 16.074219 43.902344 16.039062 43.863281 15.988281 43.828125 C 15.945312 43.800781 15.894531 43.78125 15.839844 43.769531 C 15.78125 43.757812 15.710938 43.753906 15.625 43.753906 L 15.324219 43.753906 L 15.324219 44.59375 L 15.589844 44.59375 C 15.679688 44.59375 15.757812 44.585938 15.824219 44.570312 C 15.894531 44.554688 15.957031 44.523438 16.003906 44.476562 C 16.046875 44.4375 16.082031 44.386719 16.101562 44.328125 C 16.125 44.269531 16.132812 44.203125 16.132812 44.125 Z M 16.132812 44.125 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 17.738281 45.722656 L 17.4375 45.722656 L 17.4375 43.5 L 17.742188 43.5 L 17.738281 43.726562 Z M 17.738281 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 18.808594 45.722656 L 18.808594 43.5 L 20.238281 43.5 L 20.238281 43.761719 L 19.109375 43.761719 L 19.109375 44.371094 L 20.160156 44.371094 L 20.160156 44.632812 L 19.109375 44.632812 L 19.109375 45.460938 L 20.238281 45.460938 L 20.238281 45.722656 Z M 18.808594 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 24.367188 44.046875 C 24.367188 44.160156 24.347656 44.265625 24.304688 44.363281 C 24.261719 44.464844 24.199219 44.546875 24.117188 44.617188 C 24.066406 44.65625 24.011719 44.695312 23.949219 44.730469 C 23.890625 44.765625 23.824219 44.796875 23.753906 44.820312 C 23.679688 44.84375 23.601562 44.863281 23.515625 44.878906 C 23.429688 44.890625 23.335938 44.898438 23.230469 44.898438 L 22.84375 44.898438 L 22.84375 45.679688 L 22.101562 45.679688 L 22.101562 43.296875 L 23.246094 43.296875 C 23.414062 43.296875 23.5625 43.308594 23.683594 43.332031 C 23.808594 43.359375 23.921875 43.398438 24.019531 43.453125 C 24.132812 43.511719 24.21875 43.589844 24.277344 43.691406 C 24.339844 43.792969 24.367188 43.910156 24.367188 44.046875 Z M 23.609375 44.0625 C 23.609375 43.996094 23.589844 43.9375 23.550781 43.886719 C 23.511719 43.839844 23.464844 43.804688 23.40625 43.789062 C 23.339844 43.761719 23.269531 43.75 23.207031 43.746094 C 23.144531 43.742188 23.058594 43.738281 22.949219 43.738281 L 22.84375 43.738281 L 22.84375 44.453125 L 22.894531 44.453125 C 22.964844 44.453125 23.03125 44.453125 23.089844 44.453125 C 23.152344 44.449219 23.207031 44.445312 23.253906 44.441406 C 23.292969 44.433594 23.335938 44.425781 23.378906 44.410156 C 23.421875 44.394531 23.457031 44.375 23.480469 44.355469 C 23.53125 44.316406 23.566406 44.277344 23.582031 44.234375 C 23.601562 44.191406 23.609375 44.132812 23.609375 44.0625 Z M 23.609375 44.0625 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 27.679688 44.488281 C 27.679688 44.871094 27.550781 45.175781 27.296875 45.394531 C 27.042969 45.617188 26.695312 45.726562 26.25 45.726562 C 25.804688 45.726562 25.457031 45.617188 25.203125 45.390625 C 24.953125 45.167969 24.824219 44.867188 24.824219 44.488281 C 24.824219 44.105469 24.953125 43.800781 25.203125 43.578125 C 25.457031 43.355469 25.804688 43.246094 26.25 43.246094 C 26.695312 43.246094 27.042969 43.355469 27.296875 43.578125 C 27.550781 43.800781 27.679688 44.101562 27.679688 44.488281 Z M 26.914062 44.484375 C 26.914062 44.34375 26.898438 44.222656 26.859375 44.125 C 26.824219 44.023438 26.777344 43.941406 26.714844 43.878906 C 26.652344 43.8125 26.582031 43.765625 26.5 43.738281 C 26.421875 43.710938 26.339844 43.695312 26.253906 43.695312 C 26.160156 43.695312 26.078125 43.707031 26.003906 43.734375 C 25.933594 43.761719 25.859375 43.808594 25.792969 43.875 C 25.730469 43.9375 25.683594 44.019531 25.644531 44.121094 C 25.605469 44.222656 25.589844 44.34375 25.589844 44.488281 C 25.589844 44.632812 25.605469 44.753906 25.640625 44.851562 C 25.675781 44.949219 25.726562 45.027344 25.789062 45.09375 C 25.851562 45.160156 25.921875 45.207031 26.003906 45.234375 C 26.085938 45.265625 26.167969 45.277344 26.253906 45.277344 C 26.339844 45.277344 26.425781 45.261719 26.507812 45.230469 C 26.589844 45.203125 26.660156 45.15625 26.71875 45.089844 C 26.78125 45.019531 26.828125 44.941406 26.863281 44.847656 C 26.898438 44.757812 26.914062 44.636719 26.914062 44.484375 Z M 26.914062 44.484375 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 29.257812 45.722656 C 29.03125 45.722656 28.835938 45.703125 28.664062 45.667969 C 28.492188 45.632812 28.335938 45.589844 28.1875 45.539062 L 28.1875 44.972656 L 28.253906 44.972656 C 28.402344 45.070312 28.566406 45.148438 28.742188 45.203125 C 28.921875 45.257812 29.09375 45.285156 29.261719 45.285156 C 29.304688 45.285156 29.359375 45.28125 29.429688 45.273438 C 29.496094 45.265625 29.554688 45.253906 29.597656 45.238281 C 29.648438 45.222656 29.691406 45.195312 29.726562 45.164062 C 29.761719 45.132812 29.78125 45.089844 29.78125 45.035156 C 29.78125 44.976562 29.75 44.925781 29.691406 44.890625 C 29.632812 44.851562 29.566406 44.824219 29.484375 44.808594 C 29.382812 44.785156 29.277344 44.765625 29.164062 44.746094 C 29.050781 44.726562 28.941406 44.703125 28.84375 44.675781 C 28.617188 44.609375 28.453125 44.523438 28.355469 44.414062 C 28.253906 44.304688 28.207031 44.167969 28.207031 44 C 28.207031 43.777344 28.324219 43.597656 28.554688 43.460938 C 28.789062 43.320312 29.082031 43.25 29.429688 43.25 C 29.605469 43.25 29.78125 43.265625 29.953125 43.296875 C 30.125 43.324219 30.28125 43.363281 30.417969 43.410156 L 30.417969 43.957031 L 30.351562 43.957031 C 30.242188 43.878906 30.109375 43.816406 29.953125 43.765625 C 29.796875 43.710938 29.632812 43.683594 29.46875 43.683594 C 29.402344 43.683594 29.34375 43.6875 29.292969 43.695312 C 29.242188 43.703125 29.1875 43.71875 29.132812 43.738281 C 29.085938 43.757812 29.046875 43.78125 29.011719 43.816406 C 28.976562 43.847656 28.960938 43.886719 28.960938 43.929688 C 28.960938 43.988281 28.988281 44.039062 29.042969 44.074219 C 29.09375 44.109375 29.199219 44.140625 29.351562 44.171875 C 29.449219 44.1875 29.542969 44.207031 29.636719 44.222656 C 29.726562 44.238281 29.824219 44.265625 29.929688 44.292969 C 30.132812 44.351562 30.285156 44.433594 30.386719 44.535156 C 30.484375 44.636719 30.535156 44.769531 30.535156 44.933594 C 30.535156 45.171875 30.421875 45.359375 30.191406 45.503906 C 29.960938 45.648438 29.648438 45.722656 29.257812 45.722656 Z M 29.257812 45.722656 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 31.710938 45.679688 L 31.710938 43.75 L 30.839844 43.75 L 30.839844 43.296875 L 33.320312 43.296875 L 33.320312 43.75 L 32.449219 43.75 L 32.449219 45.679688 Z M 31.710938 45.679688 "
              />
              <path
                style="
                  stroke: none;
                  fill-rule: nonzero;
                  fill: rgb(13.333333%, 16.078431%, 48.627451%);
                  fill-opacity: 1;
                "
                d="M 33.859375 45.679688 L 33.859375 43.296875 L 35.847656 43.296875 L 35.847656 43.75 L 34.59375 43.75 L 34.59375 44.167969 L 35.75 44.167969 L 35.75 44.621094 L 34.59375 44.621094 L 34.59375 45.222656 L 35.847656 45.222656 L 35.847656 45.675781 L 33.859375 45.675781 Z M 33.859375 45.679688 "
              />
            </g>
          </svg>
          <div class="titles">
            <h4>DEMANDE DE PRELEVEMENT SUR COMPTE CCP</h4>
            <h6>INFORMATIONS DU TITULAIRE DE COMPTE CCP</h6>
          </div>
        </header>
        <form>
          <div class="input-filed">
            <label for="lname">Nom</label>
            <input id="lname" type="text" value="${client.lname}" />
          </div>
          <div class="input-filed">
            <label for="fname">Prenom</label>
            <input id="fname" type="text" value="${client.fname}" />
          </div>
          <div class="input-filed">
            <label for="nin">n° identifiant national</label>
            <div class="pin">
              <input type="text" value="${client.idn[0]}" />
              <input type="text" value="${client.idn[1]}" />
              <input type="text" value="${client.idn[2]}" />
              <input type="text" value="${client.idn[3]}" />
              <input type="text" value="${client.idn[4]}" />
              <input type="text" value="${client.idn[5]}" />
              <input type="text" value="${client.idn[6]}" />
              <input type="text" value="${client.idn[7]}" />
              <input type="text" value="${client.idn[8]}" />
              <input type="text" value="${client.idn[9]}" />
              <input type="text" value="${client.idn[10]}" />
              <input type="text" value="${client.idn[11]}" />
              <input type="text" value="${client.idn[12]}" />
              <input type="text" value="${client.idn[13]}" />
              <input type="text" value="${client.idn[14]}" />
              <input type="text" value="${client.idn[15]}" />
              <input type="text" value="${client.idn[16]}" />
              <input type="text" value="${client.idn[17]}" />
            </div>
          </div>
          <div style="display: flex">
            <div class="input-filed">
              <label for="nccd">n° compte ccp a debiter</label>
              <div class="pin">
                <input type="text" value="${client.ccp.number[0]}" />
                <input type="text" value="${client.ccp.number[1]}" />
                <input type="text" value="${client.ccp.number[2]}" />
                <input type="text" value="${client.ccp.number[3]}" />
                <input type="text" value="${client.ccp.number[4]}" />
                <input type="text" value="${client.ccp.number[5]}" />
                <input type="text" value="${client.ccp.number[6]}" />
                <input type="text" value="${client.ccp.number[7]}" />
                <input type="text" value="${client.ccp.number[8]}" />
                <input type="text" value="${client.ccp.number[9]}" />
              </div>
            </div>
            <div class="input-filed">
              <label for="cle" style="width: auto; margin: 0 10px">clé</label>
              <div class="pin" style="margin-right: 5px">
                <input type="text" value="${client.ccp.key[0]}" />
                <input type="text" value="${client.ccp.key[1]}" />
              </div>
            </div>
          </div>
          <div style="display: flex">
            <div class="input-filed">
              <label for="nccd">n° compte ccp a crediter</label>
              <div class="pin">
             <input type="text" value="${USER.ccp.number[0]}" />
                <input type="text" value="${USER.ccp.number[1]}" />
                <input type="text" value="${USER.ccp.number[2]}" />
                <input type="text" value="${USER.ccp.number[3]}" />
                <input type="text" value="${USER.ccp.number[4]}" />
                <input type="text" value="${USER.ccp.number[5]}" />
                <input type="text" value="${USER.ccp.number[6]}" />
                <input type="text" value="${USER.ccp.number[7]}" />
                <input type="text" value="${USER.ccp.number[8]}" />
                <input type="text" value="${USER.ccp.number[9]}" />
              </div>
            </div>
            <div class="input-filed">
              <label for="cle" style="width: auto; margin: 0 10px">clé</label>
              <div class="pin" style="margin-right: 5px">
                <input type="text" value="${USER.ccp.key[0]}" />
                <input type="text" value="${USER.ccp.key[1]}" />
              </div>
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">jour de prelevement dans le mois</label>
            <div class="pin">
              <input type="text" value="${USER.payDay[0]}" />
              <input type="text" value="${USER.payDay[1]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">date debut prelevelent</label>
            <div class="pin">
              <input type="text" value="${sDay[0]}" />
              <input type="text" value="${sDay[1]}" />
              <span class="slash"></span>
              <input type="text" value="${sMonth[0]}" />
              <input type="text" value="${sMonth[1]}" />
              <span class="slash"></span>
              <input type="text" value="${sYear.toString()[0]}" />
              <input type="text" value="${sYear.toString()[1]}" />
              <input type="text" value="${sYear.toString()[2]}" />
              <input type="text" value="${sYear.toString()[3]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="dfp">date fin prelevelent</label>
            <div class="pin">
                <input type="text" value="${eDay[0]}" />
              <input type="text" value="${eDay[1]}" />
              <span class="slash"></span>
              <input type="text" value="${eMonth[0]}" />
              <input type="text" value="${eMonth[1]}" />
              <span class="slash"></span>
              <input type="text" value="${eYear.toString()[0]}" />
              <input type="text" value="${eYear.toString()[1]}" />
              <input type="text" value="${eYear.toString()[2]}" />
              <input type="text" value="${eYear.toString()[3]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="amount">montant a prelever</label>
            <input id="amount" type="text" value="${order.amount}" />
          </div>
          <div class="input-filed">
            <label for="nmbr">nomber</label>
            <div class="pin">
              <input type="text" value="${nombre.toString()[0]}" />
              <input type="text" value="${nombre.toString()[1]}" />
            </div>
          </div>
        </form>
        <section class="licensing">
          <p>
            Je sounigné(e), autorise ALGERIE POSTE à débiter non compte des
            ordres de prélèvement établa à mon son
            par.............................................majonés par las
            tanes y affirentes
          </p>
          <p>
            Je déclare en outre que les réclamations éventuelles concernant les
            ordres de prélèvement présentés served adressés par mes seins namous
            khaled
          </p>
          <p>
            Je m'engage à maintenir sur mon compte ou à y constituer 10 jours
            avant la date d'échéance une provision niffisante permettant la
            réalisation de ces opérations
          </p>
          <div class="stamp">Cachet de l'APC</div>
        </section>
        <h5 class="note">*A remplir par le titulaire du Compte CCP</h5>
      </article>
    </div>`;

    const printDocument = `<html>
  <head>
    <link rel="stylesheet" href="./index.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

@media print {
  @page {
    size: landscape;
    width: 1123px;
    height: 794px;
    background: red;
  }
  .page {
    page-break-after: always;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 20px;
  }

  .page article {
    width: 50%;
  }

  .page .divider {
    height: 100%;
    border: 1px dashed rgba(0, 0, 0, 0.4);
    margin: 0 15px;
  }

  .page article header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .page article header .titles {
    width: 300px;
    text-align: center;
    margin: 0 auto;
  }

  .page article header .titles h4 {
    margin-bottom: 5px;
    border-radius: 5px;
  }

  .page article .logo {
    width: 40px;
    margin-left: 15px;
  }

  .page article form {
    margin-top: 30px;
    font-size: 10px;
  }

  .page article form .input-filed {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .page article form .input-filed label {
    width: 70px;
    text-align: left;
    margin-right: 5px;
    text-transform: uppercase;
  }

  .page article form .input-filed > input {
    flex: 1;
    padding: 3px;
    background: none;
    border: none;
    font-size: 10px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-right: 30px;
  }

  .page article form .input-filed .pin {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .page article form .input-filed .pin input {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    width: 18px;
    height: 18px;
    text-align: center;
    margin: 0 2.5px;
    font-size: 12px;
    padding: 0 auto;
  }

  .page article form .input-filed .pin .slash::after {
    content: "-";
    font-size: 18px;
    font-weight: 600;
    margin: 0 5px;
    color: rgba(0, 0, 0, 0.7);
  }

  .page article h6 {
  }

  .page article section.acceptness-form {
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.7);
  }

  .page article section.acceptness-form .header {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .page article section.acceptness-form .header .question {
    margin-right: 10px;
  }
  .page article section.acceptness-form .header .answer {
    margin: 0 20px;
    position: relative;
  }
  .page article section.acceptness-form .header span::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    position: absolute;
    left: -25px;
    top: 50%;
    transform: translateY(-50%);
  }
  .page article section.acceptness-form .decision {
    margin: 5px auto;
    width: 100px;
  }
  .page article section.acceptness-form .decision span {
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.699);
    border-radius: 5px;
    font-size: 12px;
  }
  .page article section.acceptness-form .reason {
    display: inline;
  }

  .page article section.acceptness-form .reason p {
  }
  .page article section.acceptness-form .reason span {
    word-wrap: break-word;
  }

  .page article section.licensing {
  }

  .page article section.licensing p {
    font-size: 12px;
    margin-top: 5px;
  }

  .page article section.licensing .stamp {
    border-left: 2px solid rgb(245, 45, 45);
    margin-top: 25px;
    height: 40px;
    background-color: rgb(236, 236, 236);
    padding: 5px;
  }

  .page article .note {
    position: absolute;
    bottom: 0;
  }
}
</style>
  <body>
 ${data}
  </body>
</html>

    `;

    const iframe = iframeRef.current;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(printDocument);
    iframe.contentWindow.document.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const handleExport = () => {
    console.log("selectedClients: ", selectedClients);
    setSelectedClients([]);
  };

  const ExpandedRowRender = ({ orders, ...client }) => {
    return (
      <Table
        style={{ margin: "10px 0" }}
        columns={ordersColumns(client)}
        dataSource={orders}
        pagination={false}
        size="small"
      />
    );
  };

  const newClientsColumns = [
    Table.EXPAND_COLUMN,
    {
      title: () => (
        <>
          <span style={{ marginRight: 5 }}>Full Name</span>
          <Badge count={selectedClients.length} />
        </>
      ),
      filters: clients.map((client) => ({
        text: `${client.fname} ${client.lname}`,
        value: client.key,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.key == value,
      render: (client) => (
        <span style={{ textTransform: "uppercase" }}>
          {client.fname} {client.lname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (status) => (
        <Badge
          status="processing"
          color={CLIENTS_STATUS[status].color}
          text={CLIENTS_STATUS[status].name}
        />
      ),
    },
    {
      title: "Phone N°",
      dataIndex: "phone",
    },
    {
      title: "CCP",
      dataIndex: "ccp",
      render: (ccp) => (
        <>
          <Tag color="green">{ccp.number}</Tag>
          <Tag color="red">{ccp.key}</Tag>
        </>
      ),
    },
    {
      title: "Orders",
      dataIndex: "orders",
      render: (orders, client) => (
        <Flex align="center" justify="space-between">
          <span style={{ fontWeight: 500 }}>{orders.length}</span>{" "}
          <Tooltip title="Add New Purchase">
            <Button
              style={{ height: 25, width: 25, minWidth: "unset" }}
              onClick={() => handleAddPurchase(client)}
              type="primary"
              shape="circle"
              icon={<BadgePlus size={20} />}
            />
          </Tooltip>
        </Flex>
      ),
      width: 100,
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (createdAt) => (
        <Tag color="#711DB0">{new Date(createdAt).toLocaleString()}</Tag>
      ),
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
                  <Flex
                    align="center"
                    onClick={() => openEditClientModal(client)}
                  >
                    <Cog size={15} style={{ marginRight: 5 }} />
                    <span>Edit</span>
                  </Flex>
                ),
              },
              {
                key: "remove",
                label: (
                  <Flex
                    align="center"
                    onClick={() => handleDeleteClient(client)}
                  >
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
                  <Flex
                    align="center"
                    onClick={() => handleAddPurchase(client)}
                  >
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

  const ordersColumns = (client) => [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => <span style={{ fontWeight: 600 }}>{amount} DZD</span>,
    },
    {
      title: "Remaining (Months)",
      dataIndex: "nombre",
      render: (nombre) => <Badge count={nombre} />,
    },
    {
      title: "Start Date",
      dataIndex: "dates",
      render: (dates) => new Date(dates[0]).toDateString(),
    },
    {
      title: "End Date",
      dataIndex: "dates",
      render: (dates) => new Date(dates[1]).toDateString(),
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      render: (isPaid) => (
        <Badge
          status={isPaid ? "success" : "processing"}
          text={isPaid ? "success" : "Processing"}
        />
      ),
    },
    {
      render: (order) => (
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: (
                    <Flex
                      align="center"
                      onClick={handleEditOrder(order, client)}
                    >
                      <Cog size={15} style={{ marginRight: 5 }} />
                      <span>Edit</span>
                    </Flex>
                  ),
                },
                {
                  key: "remove",
                  label: (
                    <Flex
                      align="center"
                      onClick={handleDeleteOrder(order, client)}
                    >
                      <BadgeX size={15} style={{ marginRight: 5 }} />
                      <span>Remove</span>
                    </Flex>
                  ),
                },
                {
                  type: "divider",
                },
                {
                  key: "print",
                  label: (
                    <Flex
                      align="center"
                      onClick={handlePrintOrder(order, client)}
                    >
                      <Printer size={15} style={{ marginRight: 5 }} />
                      <span>Print</span>
                    </Flex>
                  ),
                },
              ],
            }}
            trigger={["click"]}
          >
            <EllipsisVertical size={15} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const clientModalDetails = {
    add: {
      title: (
        <Flex align="center">
          <User size={18} style={{ marginRight: 2 }} />
          Add New Client
        </Flex>
      ),
      submitBtnText: "Create",
      initialValues: {
        fname: "",
        lname: "",
        idn: null,
        phone: "",
        ccp: {
          number: null,
          key: null,
        },
      },
      onSubmit: handleAddNewClient,
    },
    edit: {
      title: (
        <Flex align="center">
          <UserPen size={18} style={{ marginRight: 2 }} />
          Edit Client
        </Flex>
      ),
      submitBtnText: "Edit",
      initialValues: tempClient,
      onSubmit: handleEditClient,
    },
  };

  return (
    <>
      <div className="page page_home">
        <div className="control">
          <Button
            type="primary"
            shape="round"
            icon={<BadgePlus size={15} />}
            onClick={handleOnAddNewClientModalOpen}
          >
            New Client
          </Button>
          <Tooltip title="Export">
            <Button
              type="default"
              shape="circle"
              icon={<Download size={18} />}
              onClick={handleExport}
              disabled={selectedClients?.length == 0}
            />
          </Tooltip>

          <Toggle
            style={{ borderRadius: "50%", height: 30, width: 30 }}
            children={<MousePointer2 size={18} />}
            onPressedChange={setIsSelectEnabled}
            pressed={isSelectEnabled}
          />
        </div>
        <Divider className="control-newclients-divider" />
        <Table
          columns={newClientsColumns}
          dataSource={clients}
          pagination={false}
          size="small"
          scroll={{
            y: pageHeight,
          }}
          expandedRowKeys={expandedRows}
          expandable={{
            expandedRowRender: ExpandedRowRender,
          }}
          rowSelection={
            !isSelectEnabled
              ? null
              : {
                  selectedRowKeys: selectedClients,
                  onChange: setSelectedClients,
                }
          }
          onRow={(record) => {
            return {
              onClick: !isSelectEnabled
                ? handleOnExpand(record)
                : () => {
                    const isExist = selectedClients.includes(record.key);
                    !isExist
                      ? setSelectedClients([...selectedClients, record.key])
                      : setSelectedClients((prevClients) =>
                          prevClients.filter((client) => client !== record.key)
                        );
                  },
            };
          }}
        />

        <iframe ref={iframeRef} style={{ display: "none" }} />
      </div>

      <Modal
        title={clientModalDetails[clientModalOp].title}
        open={clientModal}
        onCancel={handleOnAddNewClientModalCancel}
        onOk={handleAddNewClient}
        destroyOnClose={true}
        footer={false}
      >
        <Formik
          initialValues={clientModalDetails[clientModalOp].initialValues}
          validationSchema={userValidationSchema}
          onSubmit={clientModalDetails[clientModalOp].onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            errors,
            isValid,
          }) => (
            <>
              <Flex wrap="wrap" flex={1}>
                <AppInputTextFeild
                  style={{ marginRight: 5, flex: 1 }}
                  name="fname"
                  label="First Name"
                  placeholder="John"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fname}
                  status="secondary"
                  touched={touched.fname}
                  error={errors.fname}
                />
                <AppInputTextFeild
                  style={{ marginRight: 5, flex: 1 }}
                  name="lname"
                  label="Last Name"
                  placeholder="Doe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lname}
                  status="secondary"
                  touched={touched.lname}
                  error={errors.lname}
                />
              </Flex>
              <Flex wrap="wrap">
                <AppInputTextFeild
                  style={{ marginRight: 5, flex: 0.7 }}
                  name="ccp.number"
                  label="CCP N°"
                  placeholder="**********"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ccp?.number}
                  status="secondary"
                  touched={touched.ccp?.number}
                  error={errors.ccp?.number}
                  maxlength="10"
                />
                <AppInputTextFeild
                  style={{ marginRight: 5, flex: 0.3 }}
                  name="ccp.key"
                  label="Key"
                  placeholder="**"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ccp?.key}
                  status="secondary"
                  touched={touched.ccp?.key}
                  error={errors.ccp?.key}
                  maxlength="2"
                />
              </Flex>
              <Flex wrap="wrap" align="flex-end">
                <AppInputTextFeild
                  style={{ marginRight: 5, flex: 0.4 }}
                  name="idn"
                  label="ID N°"
                  placeholder="ID Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.idn}
                  status="primary"
                  touched={touched.idn}
                  error={errors.idn}
                  maxlength="18"
                />
                <AppInputTextFeild
                  style={{ marginRight: 5, marginRight: 5, flex: 0.4 }}
                  name="phone"
                  label="Phone N°"
                  placeholder="0783773369"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  status="primary"
                  touched={touched.phone}
                  error={errors.phone}
                />
              </Flex>
              <Button
                style={{ fontWeight: "600", float: "right", marginTop: 10 }}
                type="primary"
                onClick={handleSubmit}
                disabled={!isValid}
                loading={isSubmitting}
              >
                {clientModalDetails[clientModalOp].submitBtnText}
              </Button>
              <div style={{ clear: "both" }}></div>
            </>
          )}
        </Formik>
      </Modal>
      <Modal
        title={
          <Flex align="center">
            <Package size={18} style={{ marginRight: 2 }} />
            Add New Purchase
          </Flex>
        }
        open={addNewPurchaseModal}
        onCancel={handleCancelNewPurchase}
        destroyOnClose={true}
        footer={false}
      >
        <Formik
          initialValues={{
            name: "",
            amount: null,
            nombre: 3,
            dates: [dayjs(), null],
          }}
          validationSchema={orderValidationSchema}
          onSubmit={handleSubmitNewPurchase}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            isValid,
          }) => (
            <div className="purchase-form">
              <label>Name</label>
              <Input
                name="name"
                placeholder="Sony PS4"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <label>Amount</label>
              <Input
                name="amount"
                type="number"
                placeholder="2000"
                suffix="DZD"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="amount">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <label>Nombre</label>
              <Input
                name="nombre"
                type="number"
                suffix="Time"
                min={1}
                max={99}
                minLength={1}
                maxLength={2}
                value={values.nombre}
                onChange={(event) => {
                  if (!values.dates) return handleChange(event);
                  const monthsToAdd = event.target.value;
                  const newDate = dayjs(values.dates[0]).add(
                    monthsToAdd,
                    "month"
                  );
                  const newDates = [...values.dates];
                  newDates[1] = newDate;
                  setFieldValue("dates", newDates);
                  handleChange(event);
                }}
                onBlur={handleBlur}
              />
              <ErrorMessage name="nombre">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <label>Timeline</label>
              <DatePicker.RangePicker
                onBlur={handleBlur}
                onChange={(dates) => {
                  if (!dates) return;

                  const startDate = dates[0];
                  const endDate = dates[1];

                  // Calculate the difference in months
                  const monthDifference = endDate.diff(startDate, "month");

                  console.log("monthDifference: ", monthDifference);

                  setFieldValue("dates", dates);
                  setFieldValue("nombre", monthDifference);
                }}
                value={values.dates}
                allowClear
              />
              <ErrorMessage name="dates">
                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
              </ErrorMessage>
              <Button
                style={{ fontWeight: "600", float: "right", margin: "10px 0" }}
                type="primary"
                onClick={handleSubmit}
                disabled={!isValid}
                loading={isSubmitting}
              >
                <BadgePlus size={15} />
                Add
              </Button>
              <div style={{ clear: "both" }}></div>
            </div>
          )}
        </Formik>
      </Modal>
      {confirmModalContextHolder}
    </>
  );
}
