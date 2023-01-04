import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  CardMedia,
} from "@mui/material";
import { Edit, Favorite, Notes, Settings, Visibility, VisibilityOff } from "@mui/icons-material";
import { DisplayUsername } from "../Common/DisplayUsername";
import { useMeQuery, User, useUpdateMeMutation } from "../../generated/graphql";

export interface ProjectCardProps {
  project: any;
  onDelete: (id: string) => void;
}

interface IKeyMember {
  [key: string]: { user: User, captions: string[] }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { data: me } = useMeQuery()
  const [updateMe] = useUpdateMeMutation()
  const [hide, setHide] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const nav = useNavigate();
  const [keyMembers, setKeyMembers] = useState<IKeyMember>({})

  useEffect(() => {
    console.log('projec', project);
    if (me) {
      setFavorite(!!me.me?.favorites?.some(f => f === project._id))
      setHide(!!me.me?.hidden?.some(f => f === project._id))
    }
  }, [me, project])

  return (
    <Card style={{ width: '400px', minHeight: '375px', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
      {project.heroImage && project.heroImage.path ?
        <CardMedia
          style={{ opacity: hide ? 0.5 : 1, height: 225 }}
          image={project.heroImage.path}
          title="Project Image"
        /> :
        <CardMedia
          style={{ opacity: hide ? 0.5 : 1, height: 225, backgroundColor: 'lightgray' }}
          title="Project Image"
        />
      }
      <CardHeader
        style={{ opacity: hide ? 0.5 : 1 }}
        title={<span style={{ WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project?.projectName}
        </span>}
      />
      <CardContent
        style={{ opacity: hide ? 0.5 : 1 }}>
        <div style={{ display: 'grid', gridAutoFlow: 'row', justifyContent: 'start', gridGap: '1em' }}>
          {
            Object.keys(keyMembers).map(key => (
              <DisplayUsername key={key} user={keyMembers[key].user} caption={keyMembers[key].captions.join('/')} />
            ))
          }
        </div>
      </CardContent>
      <CardActions>

        <IconButton onClick={() => {
          updateMe({
            variables: {
              userInput: {
                email: me!.me!.email,
                favorites: !favorite ? [...me!.me!.favorites, project._id] : me?.me?.favorites.filter(p => p !== project._id)
              }
            }
          })
        }}>
          <Favorite style={{ fill: favorite ? '#B51840' : 'currentColor' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            nav(`/projects/${project._id}`);
          }}
        >
          <Edit />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Tooltip title="Hide">
          <IconButton
            onClick={() => {
              updateMe({
                variables: {
                  userInput: {
                    email: me!.me!.email,
                    hidden: !hide ? [...me!.me!.hidden, project._id] : me?.me?.hidden.filter(p => p !== project._id)
                  }
                }
              })
            }}>
            {
              hide ?
                <VisibilityOff />
                :
                <Visibility />
            }
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton
            onClick={() => {
              nav(`/projects/${project._id}/settings`);
            }}>
            <Settings />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
