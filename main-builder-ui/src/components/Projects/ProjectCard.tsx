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
import { useMeQuery, User } from "../../generated/graphql";

export interface ProjectCardProps {
  projectAccess: any;
  onDelete: (id: string) => void;
}

interface IKeyMember {
  [key: string]: { user: User, captions: string[]}
}

export function ProjectCard({ projectAccess: { project, isFavorite, hide } }: ProjectCardProps) {
  const { data: me } = useMeQuery()
  const nav = useNavigate();
  const [keyMembers, setKeyMembers] = useState<IKeyMember>({})

  // useEffect(() => {
  //   const newKeyMembers: IKeyMember = {}
  //   course.subjectMatterExperts.forEach(sme => {
  //     if (newKeyMembers[sme.email]) {
  //       newKeyMembers[sme.email].captions.push('SME')
  //     } else {
  //       newKeyMembers[sme.email] = {
  //         user: sme,
  //         captions: ['SME']
  //       }
  //     }
  //   })
    
  //   course.projectManagers.forEach(pms => {
  //     if (newKeyMembers[pms.email]) {
  //       newKeyMembers[pms.email].captions.push('PM')
  //     } else {
  //       newKeyMembers[pms.email] = {
  //         user: pms,
  //         captions: ['PM']
  //       }
  //     }
  //   })
  //   setKeyMembers(newKeyMembers)
  // }, [course])

  return (
    <Card style={{ width: '400px', minHeight: '450px', display: 'grid', gridTemplateRows: 'auto auto 1fr auto'}}>
    <CardMedia
    style={{ opacity: hide ? 0.5 : 1 }}
            image={`data:image/jpeg;base64,${project.image.image}`}
            title="Course Image"
          />
      <CardHeader
    style={{ opacity: hide ? 0.5 : 1 }}
        title={<span style={{ WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.name}
        </span>}
        subheader={project.courseCode}
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
          // updateCourseMembership({
          //   variables: {
          //     courseId: course.id,
          //     userEmail: me!.email,
          //     courseAccessDetails: {
          //       isFavorite: !isFavorite
          //     }
          //   }
          // })
        }}>
          <Favorite style={{ fill: isFavorite ? '#B51840' : 'currentColor' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            nav(`/courses/${project.id}`);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            nav(`/scripts/${project.id}`);
          }}
        >
          <Notes />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Tooltip title="Hide">
        <IconButton
          onClick={() => {
          // updateCourseMembership({
          //   variables: {
          //     courseId: course.id,
          //     userEmail: me!.email,
          //     courseAccessDetails: {
          //       hide: !hide
          //     }
          //   }
          // })
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
            nav(`/projects/${project.id}/settings`);
          }}>
          <Settings />
        </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
