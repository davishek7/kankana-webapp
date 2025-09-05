import { useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const actionData = useActionData();
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.status !== 200) {
      toast.error(actionData?.message);
      return
    }
    saveAuth(
      actionData?.data.user,
      actionData?.data.auth_tokens.access_token,
      actionData?.data.auth_tokens.refresh_token
    );
    navigate("/admin", { replace: true });
  }, [actionData, saveAuth, navigate]);

  return (
    <div
      className="card shadow p-4"
      style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
    >
      <h3 className="text-center mb-4">Login</h3>
      <Form method="post">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            name="email"
            placeholder="Email"
            required
          />
          <label htmlFor="loginEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p className="text-center mb-0">
          Don’t have an account? <Link to="/auth/register">Register</Link>
        </p>
      </Form>
    </div>
  );
}
