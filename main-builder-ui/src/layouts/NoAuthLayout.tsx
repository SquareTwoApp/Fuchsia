import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useServerVersionNumberQuery } from '../generated/graphql';
import bgImage from "../assets/bgtexture2.jpg"

export const NoAuthLayout = () => {
  const { data: serverVersion } = useServerVersionNumberQuery();

  const clientVersionNumber = useMemo(() => `v${process.env.REACT_APP_VERSION}`, [])
  const serverVersionNumber = useMemo(() => {
    if (serverVersion) {
      return `v${serverVersion.serverVersionNumber}`;
    }
  }, [serverVersion])

  return (
    <div className="public-layout" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="body-container">
        <Outlet />
        <div className="fluid-wrapper" style={{ alignItems: "flex-start", textAlign: "center" }}>
          <div style={{ fontSize: "0.875em", backgroundColor: '#fff', opacity: 0.9 }}>
            <span>{clientVersionNumber}</span>
            {serverVersionNumber && <span>&nbsp;|&nbsp;</span>}
            <span>{serverVersionNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
