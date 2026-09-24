import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  getCurrentUser,
} from "../services/authApi";


const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  async function login(username, password) {
    const loginData = await loginUser(
      username,
      password
    );

    const token = loginData.accessToken;

    setAccessToken(token);


    const userData = await getCurrentUser(token);

    setUser(userData);

    return userData;
  }


  function logout() {
    setUser(null);
    setAccessToken(null);
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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