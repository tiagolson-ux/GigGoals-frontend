import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    // FAKE LOGIN - Accept any credentials
    try {
      const fakeUser = {
        _id: "fake-user-id",
        name: email.split("@")[0] || "Demo User",
        email: email,
        token: "fake-jwt-token-" + Date.now()
      };

      localStorage.setItem("token", fakeUser.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${fakeUser.token}`;
      dispatch({ type: "LOGIN", payload: fakeUser });
      
      return fakeUser;
    } catch (error) {
      throw error.response.data;
    }
  };

  const register = async (name, email, password) => {
    // FAKE REGISTER - Always succeeds
    try {
      const fakeUser = {
        _id: "fake-user-id",
        name: name || email.split("@")[0] || "Demo User",
        email: email,
        token: "fake-jwt-token-" + Date.now()
      };

      return fakeUser;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
