import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useCreateOrganizationMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";

export function CreateOrganization() {
  const nav = useNavigate()
  const [createOrganization] = useCreateOrganizationMutation()
  const { status, setStatus, ...formik } = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Name required"),
    }),
    onSubmit: (values) => {
      createOrganization({
        variables: {
          organization: {
            name: values.name,
          }
        }
      })
    },
  });
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gridGap: "1em",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">
          Create Organization
        </Typography>
        <IconButton
          onClick={() => {
            nav(`/organizations`);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <form>
        <Card>
          <CardHeader title="Project Information" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography></Typography>
                <Typography>Your organization URL will be https://app.squaretwo.com/organiations/{formik.values.name.replace(/\s+/g, '-').toLowerCase()}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button variant="contained" onClick={() => nav(-1)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                formik.submitForm()
              }}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}