import React, { useEffect, useState } from "react";
import {
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRegisterMutation } from "../../generated/graphql";
import { Mail, Visibility, VisibilityOff, Lock, VerifiedUser } from "@mui/icons-material";
import { Panel } from "./Panel";
import './Authentication.css'


export function Register() {
  const [register, { data, loading, error }] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { status, setStatus, ...formik } = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("No password provided"),
      displayName: Yup.string().required("Display name required"),
    }),
    onSubmit: (values) => {
      register({
        variables: {
          email: values.email,
          password: values.password,
          displayName: values.displayName
        }
      });
    },
  });
  useEffect(() => {
    if (data) {
      nav('/dashboard')
    }
  }, [data, nav])
  useEffect(() => {
    if (status) {
      enqueueSnackbar(status.message, {
        variant: status.type,
        persist: false,
      });
    }
  }, [enqueueSnackbar, status]);

  useEffect(() => {
    if (error) {
      setStatus({
        message: "Something went wrong",
        type: "error",
      });
    }
  }, [error, setStatus]);

  return (
    <div className="ctn">
      <Panel
        rightContent={{
          title: "Welcome",
          blurb: "If you are already registered you can login using the link below",
          button: {
            name: "Login",
            location: "/login",
          },
        }}
        leftContent={{
          title: 'Register',
          submitButton: {
            label: "Sign-Up",
            onSubmit: formik.handleSubmit,
            loading: loading,
            disabled: loading,
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
                placeholder: "Display Name",
                id: "displayName",
                onChange: formik.handleChange,
                value: formik.values.displayName,
                type: "text",
                color: "secondary",
                error: !!formik.errors.displayName,
                variant: "standard",
              },
              startIcon: <VerifiedUser sx={{ color: "action.active", mr: 1, my: 0.5 }} />,
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
            {
              props: {
                sx: { minWidth: "350px" },
                placeholder: "Confirm Password",
                id: "confirmPassword",
                onChange: formik.handleChange,
                value: formik.values.confirmPassword,
                color: "secondary",
                error: !!formik.errors.confirmPassword,
                variant: "standard",
                type: showConfirmPassword ? "text" : "password",
              },
              startIcon: <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />,
              endIcon: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowConfirmPassword((p) => !p)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }
          ],
        }}
      />

    </div>
  );
}
