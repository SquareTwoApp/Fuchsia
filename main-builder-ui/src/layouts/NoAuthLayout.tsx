import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useServerVersionNumberQuery } from '../generated/graphql';

export const NoAuthLayout = () => {
  const { data: serverVersion } = useServerVersionNumberQuery();

  const clientVersionNumber = useMemo(() => `v${process.env.REACT_APP_VERSION}`, [])
  const serverVersionNumber = useMemo(() => {
    if (serverVersion) {
      return `v${serverVersion.serverVersionNumber}`;
    }
  }, [serverVersion])

  return (
    <div className="public-layout">
      <div className="body-container">
        <Outlet />
        <div className="fluid-wrapper" style={{ alignItems: "flex-start", textAlign: "center" }}>
          <div style={{ fontSize: "0.875em" }}>
            <span>{clientVersionNumber}</span>
            {serverVersionNumber && <span>&nbsp;|&nbsp;</span>}
            <span>{serverVersionNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
