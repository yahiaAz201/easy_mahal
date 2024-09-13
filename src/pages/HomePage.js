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
} from "lucide-react";
import * as Yup from "yup";

import AppInputTextFeild from "../components/AppInputTextFeild";
import { ErrorMessage, Formik } from "formik";

const pageHeight =
  window.document.documentElement.scrollHeight - (99 + 53 + 32);

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
    idn: "135792468013579",
    createdAt: "2024-09-06T19:49:09.459Z",

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
    idn: "246813579024680",
    createdAt: "2024-09-06T19:50:12.459Z",

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
    idn: "159753468012345",
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
    idn: "123456789012345",
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
    idn: "135468024135791",
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
    idn: "987654321012345",
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
    idn: "123456789987654",
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
    idn: "159753246801357",
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
    idn: "246813579013579",
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
    idn: "135792468013579",
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
    idn: "987654321012345",
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
    idn: "123456789012345",
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
    idn: "135468024135791",
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
    idn: "159753468013579",
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
    idn: "987654321098765",
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
  const [addNewClientModal, setAddNewClientModal] = useState(false);
  const [addNewPurchaseModal, setAddNewPurchaseModal] = useState(false);

  const [confirmModal, confirmModalContextHolder] = Modal.useModal();

  const iframeRef = useRef(null);

  const [tempClient, setTempClient] = useState(null);

  const handleOnAddNewClientModalOpen = () => setAddNewClientModal(true);
  const handleOnAddNewClientModalCancel = () => setAddNewClientModal(false);

  useEffect(() => {
    const newClients = NEW_CLIENTS.map((client) => {
      client["key"] = client["_id"];
      return client;
    });
    setClients(newClients);
  }, []);

  const handleAddNewClient = async (clientData) => {
    const client = clientData;

    client["key"] = "415qs6d465sq4d" + Math.random() * 10000;
    client["createdAt"] = new Date().toISOString();
    client["orders"] = [];

    setClients([client, ...clients]);
    setAddNewClientModal(false);
    message.success("New Client Added Successfully");
  };

  const handleEditClient = (client) => () => {};

  const handleDeleteClient = (_client) => async () => {
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
  const handleAddPurchase = (client) => () => {
    setTempClient(client);
    setAddNewPurchaseModal(true);
  };

  const handleCancelNewPurchase = () => {
    setAddNewPurchaseModal(false);
    setTempClient(null);
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
    const data = `<div class="page">
      <article>
        <img
          class="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/72/AlgeriePoste.svg"
        />
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
             ${client.idn
               .split("")
               .map((n) => `<input type="text" value="${n}" />`)
               .join("")}
            </div>
          </div>
          <div class="input-filed">
            <label for="nccd">n° compte ccp a debiter</label>
            <div class="pin">
             ${client.ccp.number
               .split("")
               .map((n) => `<input type="text" value="${n}" />`)
               .join("")}
            </div>
            <label for="cle">clé</label>
            <div class="pin">
              <input type="text" value="${client.ccp.key[0]}" />
              <input type="text" value="${client.ccp.key[1]}" />
            </div>
          </div>
          <div class="input-filed">
            <label for="nccd">n° compte ccp a crediter</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
              <input type="text" value="5" />
              <input type="text" value="4" />
              <input type="text" value="7" />
              <input type="text" value="8" />
              <input type="text" value="9" />
              <input type="text" value="7" />
              <input type="text" value="5" />
              <input type="text" value="5" />
            </div>
            <label for="cle">clé</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">jour de prelevement dans le mois</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="2" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">date debut prelevelent</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="6" />
              <span class="slash"></span>
              <input type="text" value="0" />
              <input type="text" value="4" />
              <span class="slash"></span>
              <input type="text" value="2" />
              <input type="text" value="0" />
              <input type="text" value="2" />
              <input type="text" value="4" />
            </div>
          </div>
          <div class="input-filed">
            <label for="dfp">date fin prelevelent</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="6" />
              <span class="slash"></span>
              <input type="text" value="0" />
              <input type="text" value="4" />
              <span class="slash"></span>
              <input type="text" value="2" />
              <input type="text" value="0" />
              <input type="text" value="2" />
              <input type="text" value="4" />
            </div>
          </div>
          <div class="input-filed">
            <label for="amount">montant a prelever</label>
            <input id="amount" type="text" value="${order.amount}" />
          </div>
          <div class="input-filed">
            <label for="nmbr">nomber</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="2" />
            </div>
          </div>
        </form>
        <h6>CADRE RESERVE AU CCP</h6>
       <section class="acceptness-form">
          <div class="header">DEMANDE ACCEPTEE</div>
          <div class="decision">
            <span>OUI</span>
            <span>NO</span>
          </div>
          <div class="reason">
            <span>MOTIF DU REJET:</span>
            <span>
              ......................................................................................................................................................................................................................
            </span>
          </div>
        </section>
      </article>
      <div class="divider"></div>
      <article>
        <img
          class="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/72/AlgeriePoste.svg"
        />
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
              ${client.idn
                .split("")
                .map((n) => `<input type="text" value="${n}" />`)
                .join("")}
            </div>
          </div>
          <div class="input-filed">
            <label for="nccd">n° compte ccp a debiter</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
              <input type="text" value="5" />
              <input type="text" value="4" />
              <input type="text" value="7" />
              <input type="text" value="8" />
              <input type="text" value="9" />
              <input type="text" value="7" />
              <input type="text" value="5" />
              <input type="text" value="5" />
            </div>
            <label for="cle">clé</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
            </div>
          </div>
          <div class="input-filed">
            <label for="nccd">n° compte ccp a crediter</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
              <input type="text" value="5" />
              <input type="text" value="4" />
              <input type="text" value="7" />
              <input type="text" value="8" />
              <input type="text" value="9" />
              <input type="text" value="7" />
              <input type="text" value="5" />
              <input type="text" value="5" />
            </div>
            <label for="cle">clé</label>
            <div class="pin">
              <input type="text" value="4" />
              <input type="text" value="6" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">jour de prelevement dans le mois</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="2" />
            </div>
          </div>
          <div class="input-filed">
            <label for="ddp">date debut prelevelent</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="6" />
              <span class="slash"></span>
              <input type="text" value="0" />
              <input type="text" value="4" />
              <span class="slash"></span>
              <input type="text" value="2" />
              <input type="text" value="0" />
              <input type="text" value="2" />
              <input type="text" value="4" />
            </div>
          </div>
          <div class="input-filed">
            <label for="dfp">date fin prelevelent</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="6" />
              <span class="slash"></span>
              <input type="text" value="0" />
              <input type="text" value="4" />
              <span class="slash"></span>
              <input type="text" value="2" />
              <input type="text" value="0" />
              <input type="text" value="2" />
              <input type="text" value="4" />
            </div>
          </div>
          <div class="input-filed">
            <label for="amount">montant a prelever</label>
            <input id="amount" type="text" value="1000" />
          </div>
          <div class="input-filed">
            <label for="nmbr">nomber</label>
            <div class="pin">
              <input type="text" value="1" />
              <input type="text" value="2" />
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
      </article>
    </div>
    `;
    const printDocument = `
     <html>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

@media print {
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
  @page {
    size: landscape;
  }
  .page {
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .page article {
    width: 50%;
  }

  .page .divider {
    height: 90%;
    border: 1px dashed rgba(0, 0, 0, 0.4);
    margin: 0 15px;
  }

  .page article .logo {
    width: 40px;
    margin-left: 15px;
  }

  .page article form {
    margin-top: 10px;
    font-size: 10px;
  }

  .page article form .input-filed {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .page article form .input-filed label {
    width: 70px;
    text-align: center;
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
    width: 20px;
    height: 20px;
    text-align: center;
    margin: 0 5px;
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
    margin-top: 50px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.7);
  }

  .page article section.acceptness-form .header {
    font-size: 12px;
  }
  .page article section.acceptness-form .decision {
    margin: 20px auto;
    width: 100px;
  }
  .page article section.acceptness-form .decision span {
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.699);
    border-radius: 5px;
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
    margin-top: 15px;
  }

  .page article section.licensing .stamp {
    border-left: 2px solid rgb(245, 45, 45);
    margin-top: 25px;
    height: 70px;
    background-color: rgb(236, 236, 236);
    padding: 5px;
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

  const newClientsColumns = [
    {
      title: "Full Name",
      render: (client) => `${client.fname} ${client.lname}`,
    },
    Table.EXPAND_COLUMN,
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
      render: (orders) => orders.length,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => <Tag>{new Date(createdAt).toLocaleString()}</Tag>,
    },
    {
      align: "right",
      render: (client) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: (
                  <Flex align="center" onClick={handleEditClient(client)}>
                    <Cog size={15} style={{ marginRight: 5 }} />
                    <span>Edit</span>
                  </Flex>
                ),
              },
              {
                key: "remove",
                label: (
                  <Flex align="center" onClick={handleDeleteClient(client)}>
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
                  <Flex align="center" onClick={handleAddPurchase(client)}>
                    <DiamondPlus size={15} style={{ marginRight: 5 }} />
                    <span>Purchase</span>
                  </Flex>
                ),
              },
            ],
          }}
          trigger={["click"]}
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
      render: (name) => (
        <span style={{ textTransform: "uppercase" }}>{name}</span>
      ),
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
        </div>
        <Divider className="control-newclients-divider" />
        <Table
          columns={newClientsColumns}
          dataSource={clients}
          pagination={false}
          size="middle"
          scroll={{
            y: pageHeight,
          }}
          expandable={{
            expandedRowRender: ExpandedRowRender,
          }}
        />

        <iframe ref={iframeRef} style={{ display: "none" }} />
      </div>
      <Modal
        title={
          <Flex align="center">
            <User size={18} style={{ marginRight: 2 }} />
            Add New Client
          </Flex>
        }
        open={addNewClientModal}
        onCancel={handleOnAddNewClientModalCancel}
        onOk={handleAddNewClient}
        destroyOnClose={true}
        footer={false}
      >
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            idn: null,
            phone: "",
            ccp: {
              number: null,
              key: null,
            },
          }}
          validationSchema={userValidationSchema}
          onSubmit={handleAddNewClient}
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
                Create
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
