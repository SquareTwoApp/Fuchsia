import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FourZeroOne } from "./401";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Main } from "./components/Main";
import { useMeQuery } from "./generated/graphql";
import { MainLayout } from "./Layout/MainLayout";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { data: meData, error: meError } = useMeQuery()
  let location = useLocation();

  if (meError) {
    return <Navigate to="/401" state={{ from: location }} replace />;
  }
  return children;
}

export function Router() {
  return (
    <Routes>
      <Route index element={<Navigate to="/server" />} />
      <Route path='/401' element={<FourZeroOne />} />
      <Route element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route path='/server' element={<Main />} />
        <Route path='/server/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}