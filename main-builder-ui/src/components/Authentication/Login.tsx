import React, { useEffect, useState } from "react";
import {
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff, Mail, Lock } from "@mui/icons-material";
import { Panel } from "./Panel";
import './Authentication.css'

export function Login() {
  const { login, loginLoading, loginFailed, isLoggedIn } = useAuth();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setStatus, status, ...formik } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("No password provided"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });



  useEffect(() => {
    if (loginFailed) {
      console.log("login failed");
      setStatus({
        message: "Invalid email or password",
        type: "error",
      });
    }
  }, [setStatus, loginFailed]);

  if (isLoggedIn) {
    nav("/dashboard");
  }

  return (
    <div className="ctn">
      <Panel
        rightContent={{
          title: "Welcome back",
          blurb: "If you do not already have an account you can register by clicking sign-up",
          button: {
            name: "Sign-up",
            location: "/register",
          },
        }}
        leftContent={{
          title: 'Login',
          links: [
            {
              name: "Forgot password?",
              location: "/forgot-password",
            },
          ],
          errorMessage: status?.message,
          submitButton: {
            label: "Login",
            onSubmit: formik.handleSubmit,
            loading: loginLoading,
            disabled: loginLoading,
          },
          fields: [
            {
              props: {
                sx: { minWidth: "350px" },
                placeholder: "Email",
                id: "email",
                onChange: formik.handleChange,
                value: formik.values.email,
                type: "text",
                color: "secondary",
                error: !!formik.errors.email,
                variant: "standard",
                helperText: formik.errors.email || " "
              },
              startIcon: <Mail sx={{ color: "action.active", mr: 1, my: 0.5, alignSelf: 'start' }} />,
            },
            {
              props: {
                sx: { minWidth: "350px" },
                placeholder: "Password",
                id: "password",
                onChange: formik.handleChange,
                value: formik.values.password,
                color: "secondary",
                error: !!formik.errors.password,
                variant: "standard",
                type: showPassword ? "text" : "password",
                helperText: formik.errors.password || " "
              },
              startIcon: <Lock sx={{ color: "action.active", mr: 1, my: 0.5, alignSelf: 'start' }} />,
              endIcon: (
                <IconButton
                  style={{ alignSelf: 'start' }}
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowPassword((p) => !p)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            },
          ],
        }}
      />

    </div>
  );
}
