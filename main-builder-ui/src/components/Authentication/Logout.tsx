import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Panel } from "./Panel";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const { logout, isLoggedIn, logoutLoading } = useAuth();
  const nav = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]);

  return (
    <Panel
    rightContent={{
      title: 'Goodbye!',
      blurb: logoutLoading ? 'Please Wait...' : 'You are now logged out',
    }}
    leftContent={{
      title: 'Logged out',
      blurb: 'You can now safely close this window',
      submitButton: {
        disabled: false,
        label: 'Return to login',
        loading: false,
        onSubmit: () => nav('/login')
      },
      fields: []
    }} />
  );
}
