import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");


    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }


    try {
      setLoading(true);

     await login(username, password);

const destination = location.state?.from || "/profile";

navigate(destination);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="login-page">

      <div className="login-container">

        <h1>Customer Login</h1>

        <p className="login-subtitle">
          Login to access your account.
        </p>


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>


          {error && (
            <p className="login-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </main>
  );
}

export default Login;