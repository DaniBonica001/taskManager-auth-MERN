import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading,setLoading]= useState(true)

  const signUp = async (data) => {
    try {
      const res = await registerRequest(data);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      //console.log(error.response)
      setErrors(error.response.data);
    }
  };

  const signIn = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = ()=>{
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUser(false)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null);
      }
      
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false)
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false)
      }
    }
    checkLogin();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
