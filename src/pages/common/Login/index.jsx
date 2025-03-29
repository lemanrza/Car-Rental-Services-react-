import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import loginSchema from "../../../validations/loginSchema";
import AuthController from "../../../services/api/AuthApi";
import { useAuth } from "../../../Services/Context/AuthContext";

const Login = () => {
  const navigate=useNavigate()
  const { login}=useAuth()
  const loginFormik=useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async(values, actions)=>{
    const response= await AuthController.login(values);
    if(!response.isLogged){
      window.alert(response.message)
      actions.resetForm()
    }
    else {
      await login(values);
      if(response.data[0].role=="admin"){
        navigate("admin");
      }
      else if(response.data[0].role=="client"){
        navigate("/")
      }
      actions.resetForm()
    }
    },
    validationSchema: loginSchema
  })


  return (
  <div className="login-body">
      <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={loginFormik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            />
             {loginFormik.errors.email && loginFormik.touched.email && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{loginFormik.errors.email}</span>
                        )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
           {loginFormik.errors.password && loginFormik.touched.password && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{loginFormik.errors.password}</span>
                        )}
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      <p >No account? <Link to={"/register"} style={{color: "#00b76b"}}> Create one </Link></p>
    </div>
  </div>
  );
};

export default Login;
