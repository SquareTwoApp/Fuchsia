import {
  Box,
  Button,
  CircularProgress,
  Link,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface NavigationItem {
  name: React.ReactNode;
  location: string;
}

interface RightContent {
  title?: string;
  blurb?: string;
  button?: NavigationItem;
}

interface LeftContent {
  title?: string;
  blurb?: string;
  fields: Array<{
    props: TextFieldProps;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
  }>;
  submitButton: {
    label: string;
    disabled: boolean;
    loading: boolean;
    onSubmit: (e: React.ChangeEvent<any>) => void;
  };
  links?: NavigationItem[];
}

interface IPanel {
  rightContent: RightContent;
  leftContent: LeftContent;
}

export function Panel({ rightContent, leftContent }: IPanel) {
  const nav = useNavigate();

  return (
    <div className="two-col-auth-panel">
      <div className="extra-info">
        {rightContent.title && <h2>{rightContent.title}</h2>}
        {rightContent.blurb && <p>{rightContent.blurb}</p>}
        {rightContent.button && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => nav(rightContent.button!.location)}
          >
            {rightContent.button.name}
          </Button>
        )}
      </div>
      <div className="auth-panel">
        <form name="panel-form" onSubmit={leftContent.submitButton.onSubmit}>
          <div className="login-box-container">
            <div className="login-box">
              {leftContent.title && <h2 className="welcome-text">{ leftContent.title }</h2>}
          { leftContent.blurb && <p>{leftContent.blurb}</p>}
              {leftContent.fields.map((field, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "flex-end" }}>
                  {field.startIcon}
                  <TextField {...field.props} />
                  {field.endIcon}
                </Box>
              ))}
              <div
                style={{
                  position: "relative",
                  margin: "3em 0",
                  textAlign: "center",
                }}
              >
                <Button
                  disabled={leftContent.submitButton.loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {leftContent.submitButton.loading && (
                    <CircularProgress
                      size={12}
                      color="secondary"
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  <span>{leftContent.submitButton.label}</span>
                </Button>
              </div>
            </div>
          </div>
          <Grid container={true} justifyContent="end">
            {leftContent.links &&
              leftContent.links.map((link, i) => (
                <Grid key={i} item>
                  <Link component={RouterLink} to={link.location}>
                    {link.name}
                  </Link>
                </Grid>
              ))}
          </Grid>
        </form>
      </div>
    </div>
  );
}
