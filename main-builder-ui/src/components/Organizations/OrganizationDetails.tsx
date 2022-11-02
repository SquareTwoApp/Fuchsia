import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

export function OrganizationDetails() {
  const [orgName, setOrgName] = useState<string>("");
  const [orgId, setOrgId] = useState<string>("");

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Description</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="Organization Name"
                  variant="outlined"
                  value={orgName}
                  onChange={(e) => setOrgName(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Organization Id"
                  variant="outlined"
                  value={orgId}
                  onChange={(e) => setOrgName(e.currentTarget.value)}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography>Address</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="123"
                  label="Street Number"
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Main St"
                  label="Street Name"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth variant="outlined" label="City" />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth variant="outlined" label="Province" />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth variant="outlined" label="Country" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ float: "right" }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
