import { createContext, useContext, useState,useEffect } from "react";
import { registerRequest,loginRequest } from "../api/auth";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const signUp = async (data) => {
    try{
      const res = await registerRequest(data);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true)
    }catch(error){
      //console.log(error.response)
      setErrors(error.response.data)
    }
  };

  const signIn = async(data)=>{
    try{
      const res = await loginRequest(data)
      console.log(res)
      setUser(res.data)
      setIsAuthenticated(true)

    }catch(error){
      if(Array.isArray(error.response.data)){
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }

  }

  useEffect(()=>{
    if(errors.length>0){
      const timer = setTimeout(()=>{
        setErrors([])
      },10000)

      return ()=>clearTimeout(timer)
    }
  },[errors])

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        user,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
