import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="row justify-content-center mt-5">
      <div
        className="card shadow border-0 rounded-3"
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary">{user.username}</h5>
          <p className="card-text mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text mb-1">
            <strong>Status:</strong>{" "}
            {user.is_active ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </p>
          <p className="card-text">
            <strong>Created At:</strong> {user.created_at}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
