import React, { useEffect } from "react";
import "./register.css";
import { Link } from "react-router";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import registerSchema from "../../../validations/registerSchema";
import User from "../../../classes/User";
import AuthController from "../../../Services/api/AuthApi";
import { useAuth } from "../../../Services/Context/AuthContext";

const Register = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            navigate("user")
        }
    }, [user, navigate])
    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values, actions) => {
            console.log("form values", values)
            const newUser = new User(values.name, values.email, values.password)
            const response = await AuthController.register(newUser);
            if (response.message == "duplicate email") {
                window.alert("Email already taken")
                registerFormik.values.email = ""
                navigate("/login")
                actions.resetForm();
            };

        },
        validationSchema: registerSchema
    })

    return (
        <div className="register-body">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.name}
                            onBlur={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.name && registerFormik.touched.name && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{registerFormik.errors.name}</span>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.email}
                            onBlur={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.email && registerFormik.touched.email && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{registerFormik.errors.email}</span>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.password}
                            onBlur={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.password && registerFormik.touched.password && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{registerFormik.errors.password}</span>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.confirmPassword}
                            onBlur={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword && (
                            <span className="block text-red-300 text-xs pl-2 mt-2">{registerFormik.errors.confirmPassword}</span>
                        )}
                    </div>
                    <button className="register-button" type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to={"/login"} style={{ color: "#00b76b" }}>Sign in</Link></p>
            </div>
        </div>
    );
};

export default Register;
