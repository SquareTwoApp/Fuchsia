import { Button } from "@mui/material";
import { useNavigate, useNavigation } from "react-router-dom";
import { useListOrganizationsQuery } from "../../generated/graphql";

export function Organizations() {
  const {
    data: OrganizationsData,
    loading: organizationsLoading,
    error: organizationsError,
  } = useListOrganizationsQuery();
  const nav = useNavigate()
  if (organizationsLoading) {
    return <div>Loading...</div>;
  }
  if (organizationsError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <h1>Organizations</h1>
      <Button
        color="primary"
        variant="contained"
        onClick={() => nav('/organization/create')}
      >
        + New Organization
      </Button>
      {/* <button onClick={() => nav('/organization/create')}>New Organization</button> */}
      <div style={{ marginTop: 12 }}>
        {OrganizationsData &&
          OrganizationsData.listOrganizations &&
          OrganizationsData.listOrganizations.length > 1 ? (
          <div>
            {OrganizationsData.listOrganizations
              .filter((o) => !o.isPersonal)
              .map((o) => (
                <div key={o._id}>
                  {o.name}
                  <button>Settings</button>
                  <button>Leave</button>
                </div>
              ))}
          </div>
        ) : (
          <div>You are not part of an organization</div>
        )}
      </div>
    </div>
  );
}
