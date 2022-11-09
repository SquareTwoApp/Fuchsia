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
  const { enqueueSnackbar } = useSnackbar();
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
    if (status) {
      enqueueSnackbar(status.message, {
        variant: status.type,
        persist: false,
      });
    }
  }, [enqueueSnackbar, status]);

  useEffect(() => {
    if (loginFailed) {
      console.log("loggin failed");
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
              },
              startIcon: <Mail sx={{ color: "action.active", mr: 1, my: 0.5 }} />,
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
              },
              startIcon: <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />,
              endIcon: (
                <IconButton
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
