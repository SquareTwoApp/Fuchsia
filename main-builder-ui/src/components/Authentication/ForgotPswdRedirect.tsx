import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Panel } from './Panel'

function ForgotPswdRedirect() {
  const nav = useNavigate()
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      nav('/login');
    }
  }, [countdown])

  return (
    <div className='ctn'>
      <Panel
        leftContent={{
          fields: [],
          title: "Password Reset Email",
          blurb: `We may have sent you an email to reset your password, if the email you provided was valid. You will automatically be redirected to the login screen in ${countdown} seconds`,
          links: [{
            name: "Back to login",
            location: "/login"
          }]
        }

        }
        rightContent={{
          title: "Reset password",
          blurb: "If you already have a code, click below to reset your password",
          button: {
            location: '/resetPassword',
            name: 'Reset Password'
          }
        }} />

    </div>
  )
}

export default ForgotPswdRedirect