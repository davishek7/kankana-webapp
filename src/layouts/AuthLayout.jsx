import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;
