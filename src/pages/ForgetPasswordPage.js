import "./ForgetPasswordPage.css";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Button, Flex, Input, message, Result, Typography } from "antd";
import AppInputTextFeild from "../components/AppInputTextFeild";
import { ArrowLeft, ArrowRight, AtSign, Key, Eye, EyeOff } from "lucide-react";

export default function ForgetPassword() {
  const [currentStep, setCurrentStep] = useState(0);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsDisabled(true);
  }, [currentStep]);

  useEffect(() => {
    if (passwords.new != passwords.confirm || passwords.new.length < 8)
      setIsDisabled(true);
    else setIsDisabled(false);
  }, [passwords]);

  const onEmailChange = (event) => {
    const { value } = event.target;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      setIsDisabled(true);
    else setIsDisabled(false);
    setEmail(value);
  };

  const onOtpChange = (value) => {
    setIsDisabled(false);
    setOtp(value);
  };

  const onPasswordsChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmitEmail = async () => {
    console.log("email submitted");
    setCurrentStep(1);
  };

  const onSubmitOTP = async () => {
    console.log("OTP submitted");
    setCurrentStep(2);
  };

  const onSubmitNewPassword = async () => {
    console.log("password submitted");
    setCurrentStep(3);
  };

  const handlers = {
    0: onSubmitEmail,
    1: onSubmitOTP,
    2: onSubmitNewPassword,
  };

  return (
    <div className="page_forgetPassowrd">
      <div className="form">
        {currentStep < 3 && (
          <h3 className="header">
            <Flex align="center">
              <Key size={28} style={{ marginRight: 5 }} />
              <span>Password Recovery</span>
            </Flex>
          </h3>
        )}

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={currentStep === 0 ? { x: 0, opacity: 1 } : {}}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: currentStep === 0 ? "block" : "none", // Hide others
          }}
        >
          <AppInputTextFeild
            name="email"
            label="Email"
            placeholder="Your Email Here"
            size="large"
            onChange={onEmailChange}
            value={email}
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={currentStep === 1 ? { x: 0, opacity: 1 } : {}}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: currentStep === 1 ? "block" : "none", // Hide others
          }}
        >
          <div className="otp-container">
            <div className="icon">
              <AtSign size={20} />
            </div>
            <h1 className="title">Please Enter OTP Code Below</h1>
            <p className="subtitle">
              Enter the code you recevied in your email.
            </p>
            <Input.OTP onChange={onOtpChange} value={otp} />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={currentStep === 2 ? { x: 0, opacity: 1 } : {}}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: currentStep === 2 ? "block" : "none", // Hide others
          }}
        >
          <AppInputTextFeild
            label="New Password"
            name="new"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={onPasswordsChange}
            value={passwords.new}
            status="primary"
            size="large"
            disabled={isSubmitting}
            rightIcon={
              <div className="show-icon" onClick={toggleShowPassword}>
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            }
          />
          <AppInputTextFeild
            label="Confirm Password"
            name="confirm"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={onPasswordsChange}
            value={passwords.confirm}
            status="primary"
            size="large"
            disabled={isSubmitting}
            rightIcon={
              <div className="show-icon" onClick={toggleShowPassword}>
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            }
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={currentStep === 3 ? { x: 0, opacity: 1 } : {}}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: currentStep === 3 ? "block" : "none", // Hide others
          }}
        >
          <motion.div
            initial={{ transform: "scale(0.2)", opacity: 0 }}
            animate={
              currentStep === 3 ? { transform: "scale(1)", opacity: 1 } : {}
            }
            exit={{ transform: "scale(0.2)", opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Result
              status="success"
              title="Password Successfully Changed "
              subTitle={
                <Flex justify="center">
                  <Button type="default" shape="round" iconPosition="end">
                    <ArrowRight size={18} />
                    Login
                  </Button>
                </Flex>
              }
            />
          </motion.div>
        </motion.div>

        {currentStep < 3 && (
          <Flex justify="space-between">
            <Button type="default" shape="round">
              <ArrowLeft size={18} />
              Login
            </Button>
            <div>
              <Button
                type="primary"
                style={{ marginLeft: 5 }}
                onClick={handlers[currentStep]}
                disabled={currentStep == 3 || isDisabled}
                loading={isSubmitting}
              >
                Next
              </Button>
              <Button onClick={prevStep} disabled={currentStep == 0}>
                Back
              </Button>
            </div>
          </Flex>
        )}
      </div>
    </div>
  );
}
