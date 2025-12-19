import { Link, Form } from "react-router-dom";

export default function Register() {

  return (
    <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "1rem" }}>
      <h3 className="text-center mb-4">Register</h3>
      <Form method="post">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            name="email"
            placeholder="Email"
            required
          />
          <label htmlFor="registerEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="registerPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">Register</button>
        </div>
        <p className="text-center mb-0">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </Form>
    </div>
  );
}
