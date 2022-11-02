import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Link,
  Typography,
} from "@mui/material";

export function RegistrationSuccess() {
  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="body1">Registration Successful</Typography>
        <Typography variant="body1">
          Please proceed to{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Container>
    </div>
  );
}
