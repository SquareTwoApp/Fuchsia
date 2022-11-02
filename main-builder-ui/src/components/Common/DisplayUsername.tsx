import { Typography } from "@mui/material";
import React from "react";
import { User } from "../../generated/graphql";
import { UserAvatar } from "./UserAvatar";

export function DisplayUsername({ user, caption }: { user: User, caption?: string }) {
  if (user.displayName) {
    return (
      <div className="centered-box">
        <UserAvatar caption={caption} user={user} />
        <div>
          <div>
            <Typography>
              {user.displayName}
            </Typography> 
          </div>
          <div>
            <Typography variant="caption">{user.email}</Typography>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="centered-box">
      <UserAvatar user={user} caption={caption} />
      <Typography>{user.email}</Typography>
    </div>
  );
}
