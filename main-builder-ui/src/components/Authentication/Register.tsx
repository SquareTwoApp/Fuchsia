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
      password: Yup.string()
        .required("No password provided")
        .min(8),
      confirmPassword: Yup.string()
        .required("Please confirm you password")
        .equals([Yup.ref('password')], "Your passwords must match"),
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
          errorMessage: status?.message,
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
                helperText: formik.errors.email || " "
              },
              startIcon: <Mail sx={{ color: "action.active", mr: 1, my: 0.5, alignSelf: 'start' }} />,
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
                helperText: formik.errors.displayName || " "
              },
              startIcon: <VerifiedUser sx={{ color: "action.active", mr: 1, my: 0.5, alignSelf: 'start' }} />,
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
                helperText: formik.errors.confirmPassword || " "
              },
              startIcon: <Lock sx={{ color: "action.active", mr: 1, my: 0.5, alignSelf: 'start' }} />,
              endIcon: (
                <IconButton
                  style={{ alignSelf: 'start' }}
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
