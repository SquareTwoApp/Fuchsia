import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Tag, Lock, Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { Panel } from "./Panel";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nav = useNavigate();
  const [loadingChangePassword, setLoadingChangePassword] =
    useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      nav("/dashboard");
    }
  }, [isLoggedIn, nav]);

  const {setFieldValue, ...formik} = useFormik({
    initialValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Must be at least 8 characters long")
        .required("You must enter a new password"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      setLoadingChangePassword(true);
      try {
        resetPassword(values.token, values.newPassword);
      } finally {
        setLoadingChangePassword(false);
      }
    },
  });
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setFieldValue("token", token);
    }
  }, [searchParams, setFieldValue]);

  return (
    <Panel
      rightContent={{
        title: "Forgot password",
        blurb:
          "If you do not have a code yet, click below to have a code emailed to you",
        button: {
          location: "/forgot-password",
          name: "Forgot Password",
        },
      }}
      leftContent={{
        title: "Reset Password",
        submitButton: {
          label: "Reset Password",
          onSubmit: formik.handleSubmit,
          loading: loadingChangePassword,
          disabled: loadingChangePassword,
        }, 
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
        fields: [
          {
            props: {
              sx: { minWidth: "350px" },
              placeholder: "Token",
              id: "token",
              onChange: formik.handleChange,
              value: formik.values.token,
              type: "text",
              color: "secondary",
              error: !!formik.errors.token,
              variant: "standard",
            },
            startIcon: <Tag sx={{ color: "action.active", mr: 1, my: 0.5 }} />,
          },
          {
            props: {
              sx: { minWidth: "350px" },
              placeholder: "New Password",
              id: "newPassword",
              onChange: formik.handleChange,
              value: formik.values.newPassword,
              color: "secondary",
              error: !!formik.errors.newPassword,
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
          },
        ],
      }}
    />
  );
}
