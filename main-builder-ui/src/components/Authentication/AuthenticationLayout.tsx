import React from 'react';
import { Outlet } from 'react-router-dom';
import './Authentication.css'


export const AuthenticationLayout = () => {
  return (
    <div className="authentication-layout"> 
      <Outlet />
    </div>
  )
}
