import "./Settings.css";
import React, { useState, useEffect } from "react";

import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  Divider,
  Flex,
  Input,
  Menu,
  message,
  Select,
  Space,
  InputNumber,
} from "antd";
import {
  Check,
  CircleUser,
  Fingerprint,
  Settings,
  Settings2,
  X,
} from "lucide-react";

const tabs = {
  account: {
    tabName: (
      <>
        <CircleUser size={24} />
        <span>Account</span>
      </>
    ),
    component: (props) => <Account {...props} />,
  },
  security: {
    tabName: (
      <>
        <Fingerprint size={24} />
        <span>Security</span>
      </>
    ),
    component: (props) => <Security />,
  },
};

export default function AccountPage() {
  const [currentTab, setCurrentTab] = useState("account");
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
          },
        }}
      >
        <Flex vertical={false} style={{ height: "100%" }}>
          <Menu
            style={{ flex: 0.2, marginRight: 10 }}
            defaultSelectedKeys={currentTab}
            mode="inline"
            onSelect={({ key }) => setCurrentTab(key)}
          >
            <Menu.Item icon={<CircleUser size={16} />} key="account">
              Account
            </Menu.Item>
            <Menu.Item icon={<Fingerprint size={16} />} key="security">
              Security
            </Menu.Item>
          </Menu>
          <Flex vertical flex={1}>
            <div className="tab-name">{tabs[currentTab]["tabName"]}</div>
            <Card style={{ marginBottom: 10 }}>
              <Flex wrap={"wrap"}>
                {tabs[currentTab] &&
                  tabs[currentTab] &&
                  tabs[currentTab]["component"]()}
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

function Account() {
  const validationSchema = Yup.object({
    fname: Yup.string().required().label("First Name"),
    lname: Yup.string().required().label("Last Name"),
    phone: Yup.string()
      .required()
      .matches(
        /^(0(5|6|7)\d{8}|0(2|3|4|9)\d{7})$/,
        "Phone must be a valid Number"
      )
      .label("Phone Number"),
    state: Yup.string().required().label("State"),
    city: Yup.string().required().label("City"),
    nombre: Yup.number().min(1).max(31).required().label("Nombre"),
  });

  const [states, setStates] = useState([
    { wilaya_id: "43", name: "Mila" },
    { wilaya_id: "16", name: "Algeris" },
    { wilaya_id: "18", name: "Jijel" },
    { wilaya_id: "1", name: "Adrar" },
  ]);

  const [cities, setCities] = useState([
    { id: 1, name: "Grarem Gouga" },
    { id: 2, name: "Sidi Marouan" },
    { id: 3, name: "Ferdjioua" },
    { id: 4, name: "Chelgoum El Aid" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fname: "",
    lname: "",
    state: "",
    city: "",
    phone: "",
    nombre: "",
  });

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      fname: "Yahia",
      lname: "Bourouni",
      state: "Mila",
      city: "Grarem Gouga",
      phone: "0783773369",
      nombre: 12,
    });
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 4000)
    );
    setInitialValues(values);
    setEditMode(false);
    setSubmitting(false);
    message.success("Account Data Successfuly Changed !");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        isSubmitting,
        handleChange,
        setFieldValue,
        resetForm,
        dirty,
        errors,
        values,
      }) => (
        <>
          <div className="input-container">
            <label className="input-label">First Name</label>
            <Input
              name="fname"
              onChange={handleChange}
              value={values.fname}
              disabled={!editMode}
              variant={editMode ? "outlined" : "borderless"}
              style={{
                paddingLeft: editMode ? 5 : 0,
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Last Name</label>
            <Input
              name="lname"
              onChange={handleChange}
              value={values.lname}
              disabled={!editMode}
              variant={editMode ? "outlined" : "borderless"}
              style={{
                paddingLeft: editMode ? 5 : 0,
              }}
            />
          </div>

          <div className="input-container">
            <label className="input-label">State</label>
            <div>
              <Select
                style={{
                  paddingLeft: editMode ? 5 : 0,
                }}
                onChange={(state) => {
                  setFieldValue("state", state);
                }}
                value={values.state}
                disabled={!editMode}
                variant={editMode ? "outlined" : "borderless"}
                options={states.map((state) => ({
                  value: state.wilaya_id,
                  label: state.wilaya_id + " - " + state.name,
                }))}
              />
            </div>
          </div>
          <div className="input-container">
            <label className="input-label">City</label>
            <div>
              <Select
                style={{
                  paddingLeft: editMode ? 5 : 0,
                }}
                onChange={(city) => {
                  setFieldValue("city", city);
                }}
                value={values.city}
                disabled={!editMode}
                variant={editMode ? "outlined" : "borderless"}
                options={cities.map((city) => ({
                  value: city.id,
                  label: city.name,
                }))}
              />
            </div>
          </div>

          <div className="input-container">
            <label className="input-label">Phone Number</label>
            <Input
              name="phone"
              onChange={handleChange}
              value={values.phone}
              disabled={!editMode}
              variant={editMode ? "outlined" : "borderless"}
              style={{
                paddingLeft: editMode ? 5 : 0,
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Nombre</label>
            <div>
              <InputNumber
                onChange={(state) => {
                  setFieldValue("nombre", state);
                }}
                value={values.nombre}
                disabled={!editMode}
                variant={editMode ? "outlined" : "borderless"}
                style={{
                  paddingLeft: editMode ? 5 : 0,
                }}
                type="number"
                max={31}
                min={1}
              />
            </div>
          </div>

          <div className="input-container">
            <label className="input-label">CCP</label>
            <Input
              value={"002564785478, 49"}
              readOnly
              variant="borderless"
              style={{
                paddingLeft: 0,
              }}
            />
          </div>

          <Flex justify="flex-end" align="flex-end" flex={1}>
            {!editMode ? (
              <Button onClick={() => setEditMode(true)} type="link">
                <Settings2 size={16} />
                Edit
              </Button>
            ) : (
              <Flex>
                <Button
                  type="link"
                  onClick={() => {
                    setEditMode(false);
                    resetForm(); // Reset the form to initial values
                  }}
                  disabled={isSubmitting}
                >
                  <X size={16} />
                  Cancel
                </Button>

                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={Object.keys(errors).length || !dirty}
                >
                  <Check size={16} />
                  Save
                </Button>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Formik>
  );
}

function Security() {
  const [email, setEmail] = useState("");
  const [emailRef, setEmailRef] = useState("");
  const [isEmailValid, setIsEmailValid] = useState();
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const passwordsSchema = Yup.object({
    current: Yup.string().required("Current Password is required"),
    new: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("New Password is required"),
    confirm: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .oneOf([Yup.ref("new"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    setEmail("ybourouni@yahoo.com");
    setEmailRef("ybourouni@yahoo.com");
  }, []);

  useEffect(() => {
    setIsEmailValid(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    );
    setIsEmailDirty(email === emailRef);
  }, [email]);

  useEffect(() => {
    (async () => {
      try {
        await passwordsSchema.validate(passwords);
        setPasswordErrors([]);
      } catch (ex) {
        let errors = ex.errors;
        setPasswordErrors(errors);
      }
    })();
  }, [passwords]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordsChange = async (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const onEmailSubmit = async () => {
    setEmailLoading(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
    message.success("Email Successfuly Changed !");
    setEmailLoading(false);
  };

  const onPasswordSubmit = async () => {
    setPasswordLoading(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
    message.success("Password Successfuly Changed !");
    setPasswordLoading(false);
  };

  return (
    <Flex flex={1}>
      <div style={{ flex: 1 }}>
        <label className="input-label"> Email</label>
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input
            value={email}
            onChange={handleEmailChange}
            disabled={emailLoading}
          />
          <Button
            type="primary"
            icon={<Check size={16} />}
            disabled={!email || isEmailDirty || !isEmailValid}
            loading={emailLoading}
            onClick={onEmailSubmit}
          >
            Save
          </Button>
        </Space.Compact>
      </div>
      <Divider type="vertical" style={{ height: "100%", margin: "0 30px" }} />
      <Flex vertical flex={1}>
        <div style={{ flex: 1, width: "100%" }}>
          <label className="input-label">Current Password</label>
          <Input.Password
            name="current"
            value={passwords.current}
            placeholder="**********"
            onChange={handlePasswordsChange}
            disabled={passwordLoading}
          />
        </div>
        <div>
          <label className="input-label">New Password</label>
          <Input.Password
            name="new"
            value={passwords.new}
            placeholder="New Password"
            onChange={handlePasswordsChange}
            disabled={passwordLoading}
          />
        </div>
        <div>
          <label className="input-label">Confirm Password</label>
          <Input.Password
            name="confirm"
            placeholder="Confirm Password"
            value={passwords.confirm}
            status={passwordErrors.includes("Passwords must match") && "error"}
            onChange={handlePasswordsChange}
            disabled={passwordLoading}
          />
        </div>
        <Button
          style={{ marginTop: 10 }}
          type="primary"
          disabled={passwordErrors.length != 0}
          loading={passwordLoading}
          onClick={onPasswordSubmit}
        >
          Change
        </Button>
      </Flex>
    </Flex>
  );
}
