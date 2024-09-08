import "./LoginPage.css";
import React, { useEffect, useState } from "react";

import { Button, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
//import { jwtDecode } from "jwt-decode";

import AppInputTextFeild from "../components/AppInputTextFeild";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object({
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

export default function LoginPage({ setAdmin }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Log In ";
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    setSubmitting(false);
  };

  return (
    <main className="page page_login">
      <Formik
        initialValues={{
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
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="form">
            <h2 className="header">Login</h2>
            <p className="subheader">Enter your credentials below</p>
            <AppInputTextFeild
              name="email"
              label="Email"
              placeholder="Your Email Here"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              status="secondary"
              error={errors.email}
              touched={touched.email}
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
              error={errors.password}
              touched={touched.password}
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
              Login
            </Button>
          </div>
        )}
      </Formik>
    </main>
  );
}
