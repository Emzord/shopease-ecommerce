import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  getCurrentUser,
} from "../services/authApi";


const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [authLoading, setAuthLoading] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );


  // Restore logged-in user after page refresh
  useEffect(() => {
    async function restoreUser() {
      if (!accessToken) {
        setAuthLoading(false);
        return;
      }

      try {
        setAuthLoading(true);

        const userData = await getCurrentUser(
          accessToken
        );

        setUser(userData);
      } catch (error) {
        console.error(
          "Failed to restore user:",
          error
        );

        localStorage.removeItem("accessToken");

        setAccessToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    restoreUser();
  }, [accessToken]);


  // Login
  async function login(username, password) {
    const loginData = await loginUser(
      username,
      password
    );

    const token = loginData.accessToken;

    localStorage.setItem(
      "accessToken",
      token
    );

    setAccessToken(token);

    const userData = await getCurrentUser(token);

    setUser(userData);

    return userData;
  }


  // Logout
  function logout() {
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem("accessToken");
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}