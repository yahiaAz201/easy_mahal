import "./SignupPage.css";
import React, { useEffect, useState } from "react";

import { Button, message, Flex, Select, Input, Divider } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

import AppInputTextFeild from "../components/AppInputTextFeild";

import wilayat from "../assets/json/wilayat.json";

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
  email: Yup.string()
    .email()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email"
    )
    .required("Email is Required !")
    .label("Email"),
  password: Yup.string()
    .min(8)
    .max(16)
    .required("Password is Required !")
    .label("Password"),
});

export default function SignupPage() {
  const [states, setStates] = useState(wilayat);
  const [cities, setCities] = useState([]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    setSubmitting(false);
    message.success("success");
  };

  const handleStateChange = (state) => {
    const cuurentState = states.find((_state) => _state.id == state);
    if (cuurentState) {
      setCities(cuurentState.baladiyat);
    }
  };

  return (
    <main className="page page_signup">
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          phone: "",
          ccp: {
            number: null,
            key: null,
          },
          state: "",
          city: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="form">
            <h2 className="header">Sign Up</h2>
            <p className="subheader">Enter your credentials below</p>
            <Flex align="center" justify="space-around" wrap="wrap">
              <AppInputTextFeild
                style={{ marginRight: 5, flex: 1 }}
                name="fname"
                label="First Name"
                placeholder="john"
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
                placeholder="doe"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lname}
                status="secondary"
                touched={touched.lname}
                error={errors.lname}
              />
              {/*  <AppInputTextFeild
                style={{ marginRight: 5, flex: 1 }}
                name="ccp"
                label="CCP"
                placeholder="**********"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccp}
                status="secondary"
                touched={touched.ccp}
                error={errors.ccp}
                /> */}
              <AppInputTextFeild
                name="phone"
                label="Phone Number"
                placeholder="0783773369"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                status="secondary"
                touched={touched.phone}
                error={errors.phone}
              />
            </Flex>
            <Flex wrap="wrap">
              <Flex
                style={{
                  flexDirection: "column",
                  marginBottom: 20,
                  marginRight: 30,
                }}
              >
                <label style={{ fontWeight: 500, fontSize: 16 }}>CCP</label>
                <Input.OTP length={10} onChange={console.log} />
              </Flex>
              <Flex style={{ flexDirection: "column", marginBottom: "10px" }}>
                <label style={{ fontWeight: 500, fontSize: 16 }}>Key</label>
                <Input.OTP length={2} />
              </Flex>
            </Flex>
            <Flex vertical={false} justify="space-between" align="flex-end">
              <Select
                name="state"
                showSearch
                optionFilterProp="label"
                placeholder={"State"}
                style={{
                  flex: 0.48,
                }}
                onChange={(value) => {
                  setFieldValue("state", value);
                  const cuurentState = states.find(
                    (_state) => _state.name == value
                  );
                  if (cuurentState) {
                    setCities(cuurentState.baladiyat);
                    setFieldValue("city", cuurentState.baladiyat[1].name);
                  }
                }}
                options={states.map((state) => ({
                  value: state.name,
                  label: state.name,
                }))}
                value={values.state}
                size="middle"
                status={touched.state && errors.state ? "error" : ""}
              />

              <Select
                name="city"
                showSearch
                optionFilterProp="label"
                placeholder={"City"}
                style={{
                  flex: 0.48,
                }}
                onChange={(value) => {
                  setFieldValue("city", value);
                }}
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                value={values.city}
                size="middle"
                status={touched.city && errors.city ? "error" : ""}
                disabled={!values.state}
              />
            </Flex>
            <Divider />
            <AppInputTextFeild
              name="email"
              label="Email"
              placeholder="Your Email Here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              status="secondary"
              touched={touched.email}
              error={errors.email}
            />

            <AppInputTextFeild
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              status="secondary"
              touched={touched.password}
              error={errors.password}
            />

            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={
                errors.email ||
                errors.password ||
                !values.email ||
                !values.password
              }
            >
              Register
            </Button>
          </div>
        )}
      </Formik>
    </main>
  );
}
