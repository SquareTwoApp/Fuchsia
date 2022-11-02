import React from 'react'
import { Tooltip, Avatar, Typography } from '@mui/material';
import { User } from '../../generated/graphql';

export interface UserAvatarProps {
  user?: User
  caption?: string
}

export function UserAvatar({ user, caption }: UserAvatarProps) {
  if (!user) { return <></>}
  return (
    <div style={{ display: 'grid', justifyContent: 'start', justifyItems: 'center'}}>
  <Tooltip title={user.email}>
    {user.avatar ? (
      <Avatar
        alt={user.email}
        src={user.avatar}
      />
    ) : (
      <Avatar>
        {user.email.substring(0, 1).toUpperCase()}
      </Avatar>
    )}
      </Tooltip>
    {
      caption && <Typography variant="caption">{caption}</Typography>
    }
    </div>    
  )
}