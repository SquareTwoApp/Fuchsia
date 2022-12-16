import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ArrowBack } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail } from "@mui/icons-material";
import { Panel } from "./Panel";
import './Authentication.css'


export function ForgotPassword() {
  const nav = useNavigate();
  const { forgotPassword, isLoggedIn } = useAuth();

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const { status, setStatus, ...formik } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
    }),
    onSubmit: async (values) => {
      setShowLoading(true)
      try {
        await forgotPassword(values.email);
        nav('/ForgotPswdRedirect')
      } catch {

      } finally {
        setShowLoading(false)
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      nav("/dashboard");
    }
  }, [isLoggedIn, nav]);

  return (
    <div className="ctn">

      <Panel
        rightContent={{
          title: "Reset password",
          blurb: "If you already have a code, click below to reset your password",
          button: {
            location: '/resetPassword',
            name: 'Reset Password'
          }
        }}
        leftContent={{
          title: 'Forgot Password',
          blurb: 'If you have lost your password, enter your email address and we will send instructions on how to reset your password.',
          links: [
            {
              name: (<>
                <ArrowBack
                  fontSize="small"
                  style={{ verticalAlign: "middle" }}
                />{" "}
                Return to Login</>),
              location: "/login",
            },
          ],
          errorMessage: status?.message,
          submitButton: {
            label: "Submit",
            onSubmit: formik.handleSubmit,
            loading: showLoading,
            disabled: showLoading,
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
            }
          ],
        }}
      />
    </div>
  );
}
