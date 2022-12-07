import { AppBar, Toolbar } from '@mui/material'
import logo from "./square-two-logo(50x50).png";

interface TopBarProps {
  pageTitle: string
  children?: React.ReactNode
  nav: (location: string) => void
}

export const TopBar = ({ children, pageTitle, nav }: TopBarProps) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
      <img alt="logo" src={logo} height="30" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => nav('/')} />
      <div>{pageTitle}</div>
      {children}
      </Toolbar>
    </AppBar>
  )
}