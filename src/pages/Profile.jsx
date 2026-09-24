import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

function handleLogout() {
  logout();
  navigate("/login");
}

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-login-message">
          <h1>You are not logged in</h1>

          <p>
            Please login to view your profile.
          </p>

          <Link
            to="/login"
            className="profile-login-btn"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">

      <div className="profile-card">

        <div className="profile-image-container">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="profile-image"
          />
        </div>


        <div className="profile-details">

          <h1>
            {user.firstName} {user.lastName}
          </h1>

          <div className="profile-row">
            <span>Username</span>
            <p>{user.username}</p>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <p>{user.email}</p>
          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}

export default Profile;